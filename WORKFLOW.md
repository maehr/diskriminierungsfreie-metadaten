# Workflow

This repository uses an explicit, file-defined workflow state machine.

This project is a self-published handbook (Zenodo + GitHub Pages / Quarto publish).
It does not use the template's claim-ledger / evidence-matrix machinery.

```yaml
states:
  - id: INIT
    description: Repository initialized, no content
    next: [SPEC_PROJECT]

  - id: SPEC_PROJECT
    description: Project constraints and publication mode defined
    agent: Planner
    inputs: [specs/journal.md, specs/submission.md]
    validation: project-spec-complete
    next: [SPEC_SYNC]

  - id: SPEC_SYNC
    description: Specs inferred and synced to manuscript outline
    agent: Planner
    inputs: [specs/outline.md, specs/sections/*.md]
    validation: specs-in-sync
    next: [DRAFT]

  - id: DRAFT
    description: Manuscript sections written/edited
    agent: Drafter
    inputs: [manuscript/sections/*.qmd]
    validation: manuscript-renders
    next: [REVIEW_INTERNAL]

  - id: REVIEW_INTERNAL
    description: Internal review complete (citations, structure, style)
    agent: Epistemic Auditor
    inputs: [reviews/citation-audit.md, reviews/structure-review.md, reviews/style-pass.md]
    validation: internal-review-complete
    next: [REVIEW_EXTERNAL]

  - id: REVIEW_EXTERNAL
    description: External expert review captured
    agent: Human
    inputs: [reviews/external/*.md]
    validation: external-review-captured
    next: [RELEASE_READY]

  - id: RELEASE_READY
    description: Ready to render and publish
    agent: Submission Manager
    validation: release-checklist-complete
    next: [COMPLETE]

  - id: COMPLETE
    description: Paper submitted

transitions:
  - from: any
    to: previous
    condition: validation-failed
    action: log-failure-and-remediate

validations:
  project-spec-complete:
    - file_exists: specs/journal.md
    - file_exists: specs/submission.md
    - contains: specs/submission.md -> "publication_mode:"

  specs-in-sync:
    - file_exists: specs/outline.md
    - file_exists: specs/sections/*.md

  manuscript-renders:
    - script: npm run render
    - exit_code: 0

  internal-review-complete:
    - script: tools/scripts/check-citations.py
    - exit_code: 0

  external-review-captured:
    - file_exists: reviews/external/*.md

  release-checklist-complete:
    - contains: specs/submission.md -> "[x]" (all items)
```
