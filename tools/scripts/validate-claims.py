#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 Moritz Mähr
# Source: https://github.com/maehr/log

"""Validate that all claims have evidence support.

This script is intentionally lightweight: it ensures that claim anchors in
`manuscript/sections/*.qmd` have corresponding IDs in `research/claim-ledger.md`,
and that no ledger entry is marked `needs-citation`.
"""

import re
import sys
from pathlib import Path


def load_claim_ledger(path: Path) -> dict[str, str]:
    """Parse claim-ledger.md and return claim statuses."""
    claims: dict[str, str] = {}
    content = path.read_text(encoding="utf-8")

    # Table row format: | C1 | ... | status |
    for match in re.finditer(
        r"\|\s+(C\d+)\s+\|.+?\|.+?\|.+?\|\s+(\w+(?:[-\w]*)?)\s+\|",
        content,
    ):
        claims[match.group(1)] = match.group(2)

    return claims


def find_claim_anchors(sections_dir: Path) -> set[str]:
    """Find all claim anchors in manuscript sections."""
    anchors: set[str] = set()
    for qmd in sections_dir.glob("*.qmd"):
        content = qmd.read_text(encoding="utf-8")
        anchors.update(re.findall(r"<!--\s*claim:(C\d+)\s*-->", content))
    return anchors


def main() -> int:
    ledger_path = Path("research/claim-ledger.md")
    sections_path = Path("manuscript/sections")

    if not ledger_path.exists():
        print("ERROR: research/claim-ledger.md not found", file=sys.stderr)
        return 1

    claims = load_claim_ledger(ledger_path)
    anchors = find_claim_anchors(sections_path)

    errors: list[str] = []

    for anchor in sorted(anchors):
        if anchor not in claims:
            errors.append(f"Claim {anchor} in manuscript but not in ledger")

    for claim_id, status in claims.items():
        if status == "needs-citation":
            errors.append(f"Claim {claim_id} needs citation")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print("All claims validated successfully")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
