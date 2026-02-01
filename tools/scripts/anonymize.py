#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 Moritz Mähr
# Source: https://github.com/maehr/log

"""Anonymize manuscript for blind review submission.

Deprecated: this repository now uses a Quarto Lua filter for anonymization.
See `manuscript/_extensions/anonymize-submission/anonymize-submission.lua`.
"""

from __future__ import annotations

from pathlib import Path

import yaml


def anonymize_frontmatter(path: Path) -> None:
    """Remove identifying information from frontmatter.yml."""
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}

    # Replace or remove identifying information.
    if "author" in data:
        data["author"] = [{"name": "Anonymous"}]
    if "affiliation" in data:
        del data["affiliation"]
    if "affiliations" in data:
        del data["affiliations"]
    if "acknowledgements" in data:
        data["acknowledgements"] = "[REDACTED FOR REVIEW]"

    for key in [
        "author_contributions",
        "funding",
        "competing_interests",
        "data_availability",
        "ethics",
    ]:
        if key in data:
            data[key] = "[REDACTED FOR REVIEW]"

    path.write_text(yaml.safe_dump(data, sort_keys=False), encoding="utf-8")


def main() -> int:
    frontmatter = Path("manuscript/frontmatter.yml")
    if frontmatter.exists():
        anonymize_frontmatter(frontmatter)
        print("Anonymized manuscript/frontmatter.yml")
    else:
        print("No manuscript/frontmatter.yml found; skipping")
    print("Anonymization complete")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
