# Agents

This repository is designed for inspectable, file-based agent workflows.

Operational rule (for humans and automation): after any change batch, run `npm run validate` to auto-format, render via Quarto, and run all checks.

Optional tooling: Zotero MCP

This repo can be used with `zotero-mcp` (an MCP server for Zotero) when your agent runtime supports MCP.

- Zotero is a retrieval layer only: agents MAY search/fetch bibliographic metadata, notes, and annotations from a Zotero library.
- Canonical citations live in `manuscript/references.bib`: agents MUST NOT cite items that are not present in `manuscript/references.bib`.
- Source hygiene still applies: agents MUST NOT fabricate sources or bibliographic metadata.

## Planner

Purpose: Creates and maintains specifications; does not write manuscript text.

- Allowed inputs: `specs/*`, `research/sources/*`, user requirements, Zotero library (via Zotero MCP)
- Required outputs: `specs/*.md`, `research/claim-ledger.md`
- Constraints:
  - MUST NOT write manuscript text
  - MUST NOT fabricate sources
  - MUST ensure every claim in `specs/paper.md` has a corresponding row in `research/claim-ledger.md`

## Drafter

Purpose: Implements manuscript text strictly against specifications.

- Allowed inputs: `specs/*`, `research/*`, `manuscript/references.bib`
- Required outputs: `manuscript/sections/*.qmd`
- Constraints:
  - MUST satisfy section spec constraints (length, required citations)
  - MUST NOT add claims not in `specs/paper.md`
  - MUST NOT invent citations
  - MUST include `<!-- claim:C1 -->` anchors for traceability

## Epistemic Auditor

Purpose: Verifies claim-evidence traceability; flags uncited assertions.

- Allowed inputs: `manuscript/*`, `research/*`, `specs/*`, Zotero library (via Zotero MCP)
- Required outputs: `reviews/argument-review.md`, `reviews/citation-audit.md`
- Constraints:
  - MUST verify every `<!-- claim:CX -->` has an entry in `research/claim-ledger.md`
  - MUST flag assertions lacking citation
  - MUST NOT modify manuscript text

## Structure Editor

Purpose: Ensures macro-organization, signposting, and section logic.

- Allowed inputs: `manuscript/*`, `specs/*`
- Required outputs: `reviews/structure-review.md`
- Constraints:
  - MUST verify section order matches `specs/outline.md`
  - MUST verify signposting present (intro previews, section transitions)
  - MUST NOT rewrite content

## Style Editor

Purpose: Enforces register, clarity, and genre compliance.

- Allowed inputs: `manuscript/*`, `specs/journal.md`
- Required outputs: `reviews/style-pass.md`
- Constraints:
  - MUST enforce register from `specs/journal.md`
  - MAY make direct edits for style only (not content)

## Submission Manager

Purpose: Handles anonymization, final formatting, and checklist verification.

- Allowed inputs: `manuscript/*`, `specs/submission.md`, `tools/scripts/*`
- Required outputs: `outputs/*`, anonymized manuscript
- Constraints:
  - MUST render with the submission profile (anonymize-submission filter)
  - MAY run `tools/scripts/anonymize.py` when file-based anonymization is required
  - MUST verify all checklist items in `specs/submission.md`
  - MUST render final outputs
