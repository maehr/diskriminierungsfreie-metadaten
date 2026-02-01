#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 Moritz Mähr
# Source: https://github.com/maehr/log

"""Verify all citations in manuscript exist in references.bib."""

import re
import sys
from pathlib import Path


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
    for qmd in sections_dir.glob("*.qmd"):
        content = qmd.read_text(encoding="utf-8")
        found = re.findall(r"@(\w+)", content)
        # Filter out Quarto cross-references
        citations.update(key for key in found if key not in cross_ref_prefixes)
    return citations


def main() -> int:
    bib_path = Path("manuscript/references.bib")
    sections_path = Path("manuscript/sections")

    if not bib_path.exists():
        print("ERROR: manuscript/references.bib not found", file=sys.stderr)
        return 1

    bib_keys = load_bib_keys(bib_path)
    citations = find_citations(sections_path)
    missing = citations - bib_keys

    if missing:
        for key in sorted(missing):
            print(f"ERROR: Citation @{key} not found in references.bib", file=sys.stderr)
        return 1

    print(f"All {len(citations)} citations verified")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
