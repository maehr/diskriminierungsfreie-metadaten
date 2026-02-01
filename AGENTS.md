# Agents

This repository is designed for inspectable, file-based agent workflows.

Operational rule (for humans and automation): after any change batch, run `npm run validate` to auto-format, render via Quarto, and run all checks.

Optional tooling: Zotero MCP

This repo can be used with `zotero-mcp` (an MCP server for Zotero) when your agent runtime supports MCP.

- Zotero is a retrieval layer only: agents MAY search/fetch bibliographic metadata, notes, and annotations from a Zotero library.
- Canonical citations live in `manuscript/references.yaml`: agents MUST NOT cite items that are not present in `manuscript/references.yaml`.
- Source hygiene still applies: agents MUST NOT fabricate sources or bibliographic metadata.

## Planner

Purpose: Creates and maintains specifications; does not write manuscript text.

- Allowed inputs: `specs/*`, `research/sources/*`, user requirements, Zotero library (via Zotero MCP)
- Required outputs: `specs/*.md`
- Constraints:
  - MUST NOT write manuscript text
  - MUST NOT fabricate sources
  - MUST keep `specs/` aligned with the manuscript structure

## Drafter

Purpose: Implements manuscript text strictly against specifications.

- Allowed inputs: `specs/*`, `research/*`, `manuscript/references.yaml`
- Required outputs: `manuscript/sections/*.qmd`
- Constraints:
  - MUST satisfy section spec constraints (structure, required citations)
  - MUST NOT invent citations
  - MUST avoid introducing strong factual assertions without citations

## Epistemic Auditor

Purpose: Verifies citation coverage and claim-evidence traceability; flags uncited assertions.

- Allowed inputs: `manuscript/*`, `research/*`, `specs/*`, Zotero library (via Zotero MCP)
- Required outputs: `reviews/argument-review.md`, `reviews/citation-audit.md`
- Constraints:
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

Purpose: Handles self-publishing (rendering, publishing, release checklist verification).

- Allowed inputs: `manuscript/*`, `specs/submission.md`, `tools/scripts/*`
- Required outputs: `outputs/*`, published release artifacts
- Constraints:
  - MUST verify all checklist items in `specs/submission.md`
  - MUST render final outputs
  - MAY use anonymization tooling only when `specs/submission.md` requires it
