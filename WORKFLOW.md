# Workflow

This repository uses an explicit, file-defined workflow state machine.

```yaml
states:
  - id: INIT
    description: Repository initialized, no content
    next: [SPEC_JOURNAL]

  - id: SPEC_JOURNAL
    description: Journal constraints defined
    agent: Planner
    inputs: [specs/journal.md, specs/submission.md]
    validation: journal-spec-complete
    next: [SPEC_PAPER]

  - id: SPEC_PAPER
    description: Paper specification complete
    agent: Planner
    inputs: [specs/paper.md]
    validation: paper-spec-complete
    next: [SPEC_OUTLINE]

  - id: SPEC_OUTLINE
    description: Section specifications complete
    agent: Planner
    inputs: [specs/outline.md, specs/sections/*.md]
    validation: all-section-specs-exist
    next: [RESEARCH]

  - id: RESEARCH
    description: Research layer populated
    agent: Planner
    inputs: [research/claim-ledger.md, research/evidence-matrix.csv]
    validation: claims-have-evidence
    next: [DRAFT]

  - id: DRAFT
    description: All sections drafted
    agent: Drafter
    inputs: [manuscript/sections/*.qmd]
    validation: all-sections-drafted
    next: [REVIEW_EPISTEMIC]

  - id: REVIEW_EPISTEMIC
    description: Claim-evidence audit complete
    agent: Epistemic Auditor
    inputs: [reviews/argument-review.md, reviews/citation-audit.md]
    validation: no-uncited-claims
    next: [REVIEW_STRUCTURE]

  - id: REVIEW_STRUCTURE
    description: Structure review complete
    agent: Structure Editor
    inputs: [reviews/structure-review.md]
    validation: structure-approved
    next: [REVIEW_STYLE]

  - id: REVIEW_STYLE
    description: Style pass complete
    agent: Style Editor
    inputs: [reviews/style-pass.md]
    validation: style-approved
    next: [SUBMISSION_READY]

  - id: SUBMISSION_READY
    description: Ready for anonymization and render
    agent: Submission Manager
    validation: submission-checklist-complete
    next: [COMPLETE]

  - id: COMPLETE
    description: Paper submitted

transitions:
  - from: any
    to: previous
    condition: validation-failed
    action: log-failure-and-remediate

validations:
  journal-spec-complete:
    - file_exists: specs/journal.md
    - file_exists: specs/submission.md
    - contains: specs/journal.md -> "word_count_limit:"
    - contains: specs/submission.md -> "anonymization_required:"

  paper-spec-complete:
    - file_exists: specs/paper.md
    - contains: specs/paper.md -> "## Contribution Statement"
    - contains: specs/paper.md -> "## Thesis"
    - contains: specs/paper.md -> "## Claims List"

  all-section-specs-exist:
    - file_exists: specs/sections/01-introduction.md
    - file_exists: specs/sections/02-related-work.md
    - file_exists: specs/sections/03-methods-materials.md
    - file_exists: specs/sections/04-analysis.md
    - file_exists: specs/sections/05-discussion.md
    - file_exists: specs/sections/06-conclusion.md

  claims-have-evidence:
    - script: tools/scripts/validate-claims.py
    - exit_code: 0

  all-sections-drafted:
    - file_exists: manuscript/sections/01-introduction.qmd
    - file_not_empty: manuscript/sections/*.qmd

  no-uncited-claims:
    - script: tools/scripts/check-citations.py
    - exit_code: 0

  structure-approved:
    - contains: reviews/structure-review.md -> "Status: approved"

  style-approved:
    - contains: reviews/style-pass.md -> "Status: approved"

  submission-checklist-complete:
    - contains: specs/submission.md -> "[x]" (all items)
```
