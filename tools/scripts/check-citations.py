#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 Moritz Mähr
# Source: https://github.com/maehr/log

"""Verify all citations in manuscript exist in the bibliography.

This repo supports a YAML bibliography (`manuscript/references.yaml`) as used by
Quarto/Pandoc. We prefer YAML and fall back to BibTeX (`manuscript/references.bib`)
for older projects.
"""

import re
import sys
from pathlib import Path


def load_yaml_citation_keys(yaml_path: Path) -> set[str]:
    """Extract citation keys from a Quarto/Pandoc YAML bibliography."""

    # PyYAML is an explicit project dependency (see pyproject.toml).
    import yaml

    data = yaml.safe_load(yaml_path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        return set()

    refs = data.get("references")
    if not isinstance(refs, list):
        return set()

    keys: set[str] = set()
    for ref in refs:
        if not isinstance(ref, dict):
            continue
        key = ref.get("citation-key") or ref.get("id")
        if key is None:
            continue
        key_str = str(key).strip()
        if key_str:
            keys.add(key_str)
    return keys


def load_bib_keys(bib_path: Path) -> set[str]:
    """Extract citation keys from BibTeX file."""
    content = bib_path.read_text(encoding="utf-8")
    return set(re.findall(r"@\w+\{(\w+),", content))


def find_citations(sections_dir: Path) -> set[str]:
    """Find all @citations in manuscript sections."""
    citations: set[str] = set()
    # Quarto cross-reference prefixes to exclude (figures, tables, sections, equations, etc.)
    cross_ref_prefixes = {
        "fig",
        "tbl",
        "sec",
        "eq",
        "lst",
        "thm",
        "lem",
        "cor",
        "prp",
        "cnj",
        "def",
        "exm",
        "exr",
    }
    # Allow common Pandoc citation key characters, but exclude trailing sentence
    # punctuation (e.g. "@key.").
    cite_re = re.compile(r"(?<![\w:])@([A-Za-z0-9][A-Za-z0-9_:\-]*)")

    def is_crossref(key: str) -> bool:
        for prefix in cross_ref_prefixes:
            if key == prefix:
                return True
            if key.startswith(prefix + "-"):
                return True
            if key.startswith(prefix + ":"):
                return True
        return False

    for qmd in sections_dir.glob("*.qmd"):
        content = qmd.read_text(encoding="utf-8")
        found = cite_re.findall(content)
        citations.update(key for key in found if not is_crossref(key))
    return citations


def main() -> int:
    yaml_path = Path("manuscript/references.yaml")
    bib_path = Path("manuscript/references.bib")
    sections_path = Path("manuscript/sections")

    if yaml_path.exists():
        bib_keys = load_yaml_citation_keys(yaml_path)
        bib_label = "references.yaml"
    elif bib_path.exists():
        bib_keys = load_bib_keys(bib_path)
        bib_label = "references.bib"
    else:
        print(
            "ERROR: bibliography not found (expected manuscript/references.yaml or "
            "manuscript/references.bib)",
            file=sys.stderr,
        )
        return 1
    citations = find_citations(sections_path)
    missing = citations - bib_keys

    if missing:
        for key in sorted(missing):
            print(f"ERROR: Citation @{key} not found in {bib_label}", file=sys.stderr)
        return 1

    print(f"All {len(citations)} citations verified against {bib_label}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
