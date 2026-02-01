# Agentic Scientific Paper Template

A spec-driven, agentic workflow for academic paper writing using Quarto manuscript format. Designed for autonomous agent implementation with transparent process, auditable claims, reproducible builds, and minimal friction.

## Quickstart

Prereqs: Quarto, `uv`, Node.js.

```bash
uv sync
npm install
npm run validate
```

Common commands:

- `npm run validate` (format + render + checks)
- `npm run render` (render from `manuscript/_quarto.yml`)
- `npm run wordcount` (print word count stats only)
- `npm run anon` (anonymize then render with `--profile submission`)

- Rendering is project-based: `npm run render` executes `quarto render` in `manuscript/` using config in `manuscript/_quarto.yml`.
- Anonymization is render-time via a Quarto filter (no source files are modified): `manuscript/_extensions/anonymize-submission/anonymize-submission.lua`.
  If you need file-based anonymization, run `tools/scripts/anonymize.py` before rendering.
- Word counts are computed during render via `manuscript/_extensions/andrewheiss/wordcount/` (see `npm run wordcount`).
  `npm run wordcount` prints only the wordcount summary and does not keep any rendered output files.

## Zotero MCP (Optional)

If your agent runtime supports MCP servers, you can connect `zotero-mcp` to let agents search your Zotero library, fetch metadata/notes/annotations, and move references into the repo in a controlled way.

Repository rules when using Zotero:

- `manuscript/references.bib` is the single source of truth for cite keys used in `manuscript/sections/*.qmd`.
- Any citation used in text must exist in `manuscript/references.bib` (enforced by `tools/scripts/check-citations.py`).
- Zotero is a retrieval layer: do not fabricate sources; prefer verifying key fields (author, year, title, DOI/URL) against the original item.

Typical uses:

- Find candidate sources by keyword/tag and record them in `research/sources/reading-notes/`.
- Pull BibTeX for selected items into `manuscript/references.bib` before drafting.
- Fetch annotations to support entries in `research/claim-ledger.md` and `research/evidence-matrix.csv`.

## Outputs

- `outputs/` is a symlink to `manuscript/_outputs/`.
- Normal manuscript renders go to `outputs/manuscript/`
- Anonymized submission renders go to `outputs/submission/`
- Wordcount renders (HTML) go to `outputs/wordcount/`

## PDF / LaTeX Output (Optional)

This template does not render PDF by default.

If your journal provides a LaTeX template or class, add PDF output by configuring the `pdf:` format in `manuscript/_quarto.yml` (and optionally in `manuscript/_quarto-submission.yml`).

References:

- Quarto PDF docs: https://quarto.org/docs/output-formats/pdf-basics.html
- Quarto journal formats: https://quarto.org/docs/journals/

## Licensing

- Template code is AGPL-3.0-only (see `NOTICE.md` and SPDX headers inside code files).
- Paper contents are all rights reserved by default; replace placeholders in `COPYRIGHT-PAPER.md`.

## What To Change (Placeholders)

- `package.json`: `description`, `author`, `repository.url`, `bugs.url`, `homepage`
- `pyproject.toml`: `project.description`, `project.authors`
- `CITATION.cff`: `authors`, `repository-code`
- `manuscript/frontmatter.yml`: author names, ORCIDs, emails, affiliations, CRediT roles, declarations
- `specs/journal.md`, `specs/submission.md`, `specs/paper.md`, `specs/sections/*.md`
- `manuscript/references.bib`: replace example entry with your bibliography

---

## Repository Goals and Principles

1. **Spec-driven writing**: Outlines and section specifications are contracts that drafts must satisfy.
2. **Agentic but inspectable**: Agents operate via files (AGENTS.md, WORKFLOW.md, prompts, reviews), not hidden runtime state.
3. **Humanities-native rigor**: Claim–evidence traceability, genre control, citation hygiene.
4. **Quarto-first**: Single-source manuscript outputs (PDF/Docx/HTML), journal-ready formatting and anonymization.
5. **State-machine governance**: Explicit workflow states with validation gates ensure quality at each phase.

---

## Repository Structure

```text
paper-quarto-template/
├── README.md
├── LICENSE
├── CITATION.cff
├── Makefile
├── AGENTS.md
├── WORKFLOW.md
├── .gitignore
├── .editorconfig
│
├── skills/
│   ├── README.md
│   ├── writing/
│   │   ├── plan.md
│   │   ├── draft.md
│   │   ├── revise.md
│   │   └── style.md
│   └── research/
│       ├── sources.md
│       ├── notes.md
│       ├── evidence.md
│       └── factcheck.md
│
├── specs/
│   ├── paper.md
│   ├── outline.md
│   ├── journal.md
│   ├── submission.md
│   └── sections/
│       ├── 01-introduction.md
│       ├── 02-related-work.md
│       ├── 03-methods-materials.md
│       ├── 04-analysis.md
│       ├── 05-discussion.md
│       └── 06-conclusion.md
│
├── manuscript/
│   ├── _quarto.yml
│   ├── paper.qmd
│   ├── frontmatter.yml
│   ├── references.bib
│   ├── csl/
│   │   └── journal.csl
│   ├── templates/
│   │   ├── journal-reference.docx
│   │   └── journal-reference-anon.docx
│   ├── sections/
│   │   ├── 01-introduction.qmd
│   │   ├── 02-related-work.qmd
│   │   ├── 03-methods-materials.qmd
│   │   ├── 04-analysis.qmd
│   │   ├── 05-discussion.qmd
│   │   └── 06-conclusion.qmd
│   ├── figures/
│   ├── tables/
│   └── appendix/
│       └── appendix-a.qmd
│
├── research/
│   ├── sources/
│   │   ├── reading-notes/
│   │   └── archival-notes/
│   ├── claim-ledger.md
│   ├── evidence-matrix.csv
│   ├── terminology-glossary.md
│   └── timeline.md
│
├── reviews/
│   ├── .review-status.yml
│   ├── spec-review.md
│   ├── structure-review.md
│   ├── argument-review.md
│   ├── citation-audit.md
│   └── style-pass.md
│
├── outputs/
│
├── tools/
│   └── scripts/
│       ├── anonymize.py
│       ├── validate-claims.py
│       └── check-citations.py
│
└── .github/
    └── workflows/
        ├── render.yml
        └── checks.yml
```

### Structure Rationale

| Directory     | Purpose                                     |
| ------------- | ------------------------------------------- |
| `specs/`      | API contracts defining what must be written |
| `manuscript/` | Implementation of the paper                 |
| `research/`   | Epistemic trace and provenance              |
| `reviews/`    | Explicit acceptance tests                   |
| `skills/`     | Agent capability envelopes                  |
| `tools/`      | Automation scripts                          |
| `outputs/`    | Rendered artifacts (gitignored)             |

---

## Workflow State Machine

The `WORKFLOW.md` file defines the complete state machine governing the writing process.

```yaml
# WORKFLOW.md

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

---

## Agent Definitions

The `AGENTS.md` file defines agent roles as contracts with explicit inputs, outputs, and constraints.

```markdown
# AGENTS.md

## Planner

**Purpose**: Creates and maintains specifications; does not write manuscript text.

- **Allowed Inputs**: specs/_, research/sources/_, user requirements
- **Required Outputs**: specs/\*.md, research/claim-ledger.md
- **Constraints**:
  - MUST NOT write manuscript text
  - MUST NOT fabricate sources
  - MUST ensure every claim in specs/paper.md has a corresponding row in claim-ledger.md
- **Trigger States**: INIT, SPEC_JOURNAL, SPEC_PAPER, SPEC_OUTLINE, RESEARCH
- **Completion Criteria**: All validations pass for current state
- **Handoff**: Updates reviews/.review-status.yml, advances workflow state

---

## Drafter

**Purpose**: Implements manuscript text strictly against specifications.

- **Allowed Inputs**: specs/_, research/_, manuscript/references.bib
- **Required Outputs**: manuscript/sections/\*.qmd
- **Constraints**:
  - MUST satisfy section spec constraints (length, required citations)
  - MUST NOT add claims not in specs/paper.md
  - MUST NOT invent citations
  - MUST include `<!-- claim:C1 -->` anchors for traceability
- **Trigger States**: DRAFT
- **Completion Criteria**: All sections exist, word count met, claim anchors present
- **Handoff**: Marks DRAFT complete, triggers REVIEW_EPISTEMIC

---

## Epistemic Auditor

**Purpose**: Verifies claim-evidence traceability; flags uncited assertions.

- **Allowed Inputs**: manuscript/_, research/_, specs/\*
- **Required Outputs**: reviews/argument-review.md, reviews/citation-audit.md
- **Constraints**:
  - MUST verify every `<!-- claim:XX -->` has entry in claim-ledger with status=supported
  - MUST flag assertions lacking citation
  - MUST NOT modify manuscript text
- **Trigger States**: REVIEW_EPISTEMIC
- **Completion Criteria**: No uncited strong claims, all issues logged
- **Handoff**: If issues found, returns to Drafter with remediation list; otherwise advances

---

## Structure Editor

**Purpose**: Ensures macro-organization, signposting, and section logic.

- **Allowed Inputs**: manuscript/_, specs/_
- **Required Outputs**: reviews/structure-review.md
- **Constraints**:
  - MUST verify section order matches specs/outline.md
  - MUST verify signposting present (intro previews, section transitions)
  - MAY suggest restructuring via review file
  - MUST NOT rewrite content
- **Trigger States**: REVIEW_STRUCTURE
- **Completion Criteria**: Structure approved or issues documented
- **Handoff**: If approved, advances; otherwise returns to Drafter

---

## Style Editor

**Purpose**: Enforces register, clarity, and genre compliance.

- **Allowed Inputs**: manuscript/\*, specs/journal.md
- **Required Outputs**: reviews/style-pass.md
- **Constraints**:
  - MUST enforce register from specs/journal.md
  - MUST check word count limits
  - MAY make direct edits for style only (not content)
- **Trigger States**: REVIEW_STYLE
- **Completion Criteria**: Style approved
- **Handoff**: Advances to SUBMISSION_READY

---

## Submission Manager

**Purpose**: Handles anonymization, final formatting, and checklist verification.

- **Allowed Inputs**: manuscript/_, specs/submission.md, tools/scripts/_
- **Required Outputs**: outputs/\*, anonymized manuscript
- **Constraints**:
  - MUST render with the submission profile (anonymize-submission filter)
  - MAY run tools/scripts/anonymize.py when file-based anonymization is required
  - MUST verify all checklist items in specs/submission.md
  - MUST render final outputs
- **Trigger States**: SUBMISSION_READY
- **Completion Criteria**: Rendered outputs exist, checklist complete
- **Handoff**: Marks workflow COMPLETE
```

---

## Spec-Driven Writing Layer

### `specs/paper.md` Template

```markdown
# Paper Specification

## Contribution Statement

<!-- 1-3 sentences: what this paper contributes to the field -->

## Central Question

<!-- The problem or question this paper addresses -->

## Thesis

<!-- The position this paper defends -->

## Claims List

<!-- Numbered list of all claims made in the paper -->

1. C1: [First claim]
2. C2: [Second claim]
3. C3: [Third claim]

## Non-Claims / Out of Scope

<!-- What this paper explicitly does NOT argue -->

## Audience and Register

<!-- Target readership and appropriate tone/style -->

## Method and Material Commitments

<!-- Archives, corpora, theoretical frameworks, etc. -->

## Structure Invariants

<!-- What must appear and where -->

## Acceptance Criteria

<!-- Tests to run before submission -->

- [ ] All claims supported in claim-ledger
- [ ] Citation audit passes
- [ ] Word count within limits
- [ ] Structure review approved
- [ ] Style pass complete
```

### Section Spec Template (`specs/sections/*.md`)

```markdown
# Section Specification: [Section Name]

## Purpose

<!-- What epistemic work this section performs -->

## Inputs

<!-- Notes, sources, prior claims this section draws on -->

## Output Constraints

- Word count: [min]-[max]
- Must include: [required elements]
- Must not include: [prohibited elements]

## Required Citations

- Canonical: [foundational works]
- Empirical: [evidence sources]

## Failure Modes

<!-- Common problems to avoid -->

- Presentism
- Teleology
- Overclaiming
- Citation laundering
```

---

## Research Layer Schemas

### `research/claim-ledger.md`

```markdown
# Claim Ledger

| ID  | Claim        | Sources  | Location | Status         |
| --- | ------------ | -------- | -------- | -------------- |
| C1  | [Claim text] | [S1, S2] | §1.2 ¶3  | drafted        |
| C2  | [Claim text] | [S3]     | §3.1 ¶1  | needs-citation |
| C3  | [Claim text] | [S1, S4] | §4.2 ¶2  | supported      |

## Status Values

- `planned`: Claim identified, not yet drafted
- `drafted`: Appears in manuscript
- `supported`: Has adequate citation
- `needs-citation`: Drafted but missing support
- `contested`: Counter-evidence exists
```

### `research/evidence-matrix.csv`

```csv
source_id,source_citation,C1,C2,C3,C4,C5,notes
S1,"Author (Year)",quote,context,,,""
S2,"Author (Year)",paraphrase,,background,,""
S3,"Author (Year)",,quote,,,""
S4,"Author (Year)",,,paraphrase,counter,""
```

Cell values: `quote`, `paraphrase`, `context`, `background`, `counter`, or empty.

### `research/terminology-glossary.md`

```markdown
# Terminology Glossary

| Term   | Definition   | Source     | First Use |
| ------ | ------------ | ---------- | --------- |
| [Term] | [Definition] | [Citation] | §X.Y      |
```

---

## Reviews Layer

### `reviews/.review-status.yml`

```yaml
spec-review:
  status: pending # pending | in-progress | approved | rejected
  agent: Planner
  last_updated: null
  issues: []

structure-review:
  status: pending
  agent: Structure Editor
  last_updated: null
  issues: []

argument-review:
  status: pending
  agent: Epistemic Auditor
  last_updated: null
  issues: []

citation-audit:
  status: pending
  agent: Epistemic Auditor
  last_updated: null
  issues: []

style-pass:
  status: pending
  agent: Style Editor
  last_updated: null
  issues: []
```

### Review File Template

```markdown
# [Review Type] Review

Status: pending | in-progress | approved | rejected
Reviewer: [Agent Name]
Date: [YYYY-MM-DD]

## Summary

<!-- Overall assessment -->

## Issues Found

<!-- Numbered list of issues -->

1. [Issue description] → [Location] → [Severity: critical/major/minor]

## Recommendations

<!-- Specific remediation steps -->

## Approval Criteria Met

- [ ] [Criterion 1]
- [ ] [Criterion 2]
```

---

## Quarto Manuscript Setup

### `manuscript/_quarto.yml`

```yaml
project:
  type: manuscript
  output-dir: _outputs/manuscript

manuscript:
  article: paper.qmd

format:
  docx:
    reference-doc: templates/journal-reference.docx
  html:
    toc: true

bibliography: references.bib
csl: csl/journal.csl

metadata-files:
  - frontmatter.yml

execute:
  echo: false
  warning: false
  message: false
```

### `manuscript/_quarto-submission.yml`

```yaml
project:
  output-dir: _outputs/submission

format:
  docx:
    reference-doc: templates/journal-reference-anon.docx

# Avoid emitting HTML citation meta tags (which include authors).
google-scholar: false

filters:
  - quarto
  - anonymize-submission
```

### `manuscript/_quarto-wordcount.yml`

```yaml
# Profile for word count runs.
# Uses the quarto-wordcount extension (vendored in `manuscript/_extensions/`).

project:
  output-dir: _outputs/wordcount

format:
  wordcount-html: default
```

### `manuscript/paper.qmd`

```markdown
---
title: "Working Title"
---

{{< include sections/01-introduction.qmd >}}
{{< include sections/02-related-work.qmd >}}
{{< include sections/03-methods-materials.qmd >}}
{{< include sections/04-analysis.qmd >}}
{{< include sections/05-discussion.qmd >}}
{{< include sections/06-conclusion.qmd >}}
```

### Section File Template (`manuscript/sections/*.qmd`)

```markdown
## Section Title {#sec-name}

<!-- claim:C1 -->

[Paragraph implementing claim C1 with citation @source1.]

<!-- claim:C2 -->

[Paragraph implementing claim C2 with citations @source2; @source3.]
```

---

## Skills Layer

Skills define bounded capability envelopes for agent behaviors.

### `skills/README.md`

```markdown
# Skills

Skills are capability envelopes that define what agents are allowed and forbidden to do.

## Structure

Each skill file defines:

- **Allowed**: Operations the agent may perform
- **Forbidden**: Operations the agent must not perform
- **Inputs**: What the skill requires
- **Outputs**: What the skill produces
```

### `skills/writing/draft.md`

```markdown
# Skill: Draft Section

## Allowed

- Write prose implementing claims from specs
- Insert citations from references.bib
- Add claim anchors (`<!-- claim:XX -->`)
- Use terminology from glossary

## Forbidden

- Invent new claims not in specs/paper.md
- Fabricate citations
- Exceed word count limits
- Skip required citations from section spec

## Inputs

- specs/sections/[section].md
- research/claim-ledger.md
- manuscript/references.bib

## Outputs

- manuscript/sections/[section].qmd
```

### `skills/research/evidence.md`

```markdown
# Skill: Evidence Mapping

## Allowed

- Extract claims, methods, scope from sources
- Classify support type (quote, paraphrase, context, counter)
- Update evidence-matrix.csv
- Update claim-ledger.md status

## Forbidden

- Infer author intent beyond text
- Fabricate evidence
- Modify source interpretations

## Inputs

- research/sources/\*
- specs/paper.md (claims list)

## Outputs

- research/evidence-matrix.csv
- research/claim-ledger.md
```

---

## Tooling and Automation

### Makefile

```makefile
.PHONY: all render anon clean validate check-claims check-citations lint format

MANUSCRIPT_DIR := manuscript
OUTPUT_DIR := outputs

all: validate render

render:
 cd $(MANUSCRIPT_DIR) && quarto render

anon:
 cd $(MANUSCRIPT_DIR) && quarto render --profile submission

validate: check-claims check-citations lint

check-claims:
 uv run tools/scripts/validate-claims.py

check-citations:
 uv run tools/scripts/check-citations.py

lint:
 npx prettier --check "**/*.{md,yml,yaml,json}"
 npx prettier --check --parser markdown "**/*.qmd"
 npx bibtex-tidy $(MANUSCRIPT_DIR)/references.bib --omit=abstract,file,doi,issn --sort=author --curly --numeric --modify

format:
 npx prettier --write "**/*.{md,yml,yaml,json}"
 npx prettier --write --parser markdown "**/*.qmd"
 npx bibtex-tidy $(MANUSCRIPT_DIR)/references.bib --omit=abstract,file,doi,issn --sort=author --curly --numeric --modify

clean:
 rm -rf $(OUTPUT_DIR)/*
```

### Tool Dependencies

**Code and Document Formatting**

- [prettier](https://prettier.io/): Consistent Markdown formatting
- [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy): Bibliography cleaning

**Python Environment**

- [uv](https://docs.astral.sh/uv/): Fast Python package management

**Quarto Extensions**

- [quarto-wordcount](https://github.com/andrewheiss/quarto-wordcount): Manuscript word counting

---

## Validation Scripts

### `tools/scripts/validate-claims.py`

```python
#!/usr/bin/env python3
"""Validate that all claims have evidence support."""

import csv
import re
import sys
from pathlib import Path

def load_claim_ledger(path: Path) -> dict:
    """Parse claim-ledger.md and return claim statuses."""
    claims = {}
    content = path.read_text()
    for match in re.finditer(r'\| (C\d+) \| .+? \| .+? \| .+? \| (\w+[-\w]*) \|', content):
        claims[match.group(1)] = match.group(2)
    return claims

def find_claim_anchors(sections_dir: Path) -> set:
    """Find all claim anchors in manuscript sections."""
    anchors = set()
    for qmd in sections_dir.glob('*.qmd'):
        content = qmd.read_text()
        anchors.update(re.findall(r'<!-- claim:(C\d+) -->', content))
    return anchors

def main():
    ledger_path = Path('research/claim-ledger.md')
    sections_path = Path('manuscript/sections')

    claims = load_claim_ledger(ledger_path)
    anchors = find_claim_anchors(sections_path)

    errors = []

    # Check all anchored claims have ledger entries
    for anchor in anchors:
        if anchor not in claims:
            errors.append(f"Claim {anchor} in manuscript but not in ledger")

    # Check all claims needing citation
    for claim_id, status in claims.items():
        if status == 'needs-citation':
            errors.append(f"Claim {claim_id} needs citation")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)

    print("All claims validated successfully")
    sys.exit(0)

if __name__ == '__main__':
    main()
```

### `tools/scripts/check-citations.py`

```python
#!/usr/bin/env python3
"""Verify all citations in manuscript exist in references.bib."""

import re
import sys
from pathlib import Path

def load_bib_keys(bib_path: Path) -> set:
    """Extract citation keys from BibTeX file."""
    content = bib_path.read_text()
    return set(re.findall(r'@\w+\{(\w+),', content))

def find_citations(sections_dir: Path) -> set:
    """Find all @citations in manuscript sections."""
    citations = set()
    for qmd in sections_dir.glob('*.qmd'):
        content = qmd.read_text()
        citations.update(re.findall(r'@(\w+)', content))
    return citations

def main():
    bib_path = Path('manuscript/references.bib')
    sections_path = Path('manuscript/sections')

    bib_keys = load_bib_keys(bib_path)
    citations = find_citations(sections_path)

    missing = citations - bib_keys

    if missing:
        for key in sorted(missing):
            print(f"ERROR: Citation @{key} not found in references.bib", file=sys.stderr)
        sys.exit(1)

    print(f"All {len(citations)} citations verified")
    sys.exit(0)

if __name__ == '__main__':
    main()
```

### `tools/scripts/anonymize.py`

```python
#!/usr/bin/env python3
"""Anonymize manuscript for blind review submission."""

import re
import yaml
from pathlib import Path

def anonymize_frontmatter(path: Path):
    """Remove identifying information from frontmatter.yml."""
    content = path.read_text()
    data = yaml.safe_load(content)

    # Remove author information
    if 'author' in data:
        data['author'] = [{'name': 'Anonymous'}]
    if 'affiliation' in data:
        del data['affiliation']
    if 'acknowledgements' in data:
        data['acknowledgements'] = '[REDACTED FOR REVIEW]'

    path.write_text(yaml.dump(data, default_flow_style=False))

def anonymize_self_citations(sections_dir: Path, self_cite_pattern: str):
    """Replace self-citations with neutral placeholders."""
    for qmd in sections_dir.glob('*.qmd'):
        content = qmd.read_text()
        content = re.sub(
            rf'@{self_cite_pattern}',
            '@SELF_CITATION_REMOVED',
            content
        )
        qmd.write_text(content)

def main():
    frontmatter = Path('manuscript/frontmatter.yml')
    sections = Path('manuscript/sections')

    if frontmatter.exists():
        anonymize_frontmatter(frontmatter)
        print("Anonymized frontmatter.yml")

    # Configure self-citation pattern as needed
    # anonymize_self_citations(sections, r'AuthorLastName\d{4}')

    print("Anonymization complete")

if __name__ == '__main__':
    main()
```

---

## GitHub Actions

### `.github/workflows/render.yml`

```yaml
name: Render Manuscript

on:
  push:
    branches: [main]
    paths:
      - "manuscript/**"
      - "specs/**"
  workflow_dispatch:

jobs:
  render:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Quarto
        uses: quarto-dev/quarto-actions/setup@v2

      - name: Render manuscript
        run: |
          cd manuscript
          quarto render

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: manuscript-outputs
          path: outputs/
```

### `.github/workflows/checks.yml`

```yaml
name: Quality Checks

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup uv
        uses: astral-sh/setup-uv@v4

      - name: Install dependencies
        run: npm install -g prettier bibtex-tidy

      - name: Lint Markdown
        run: npx prettier --check "**/*.md"

      - name: Check bibliography
        run: npx bibtex-tidy --omit=abstract,file,doi,issn --sort=author --curly --numeric --modify manuscript/references.bib

      - name: Validate claims
        run: uv run tools/scripts/validate-claims.py

      - name: Check citations
        run: uv run tools/scripts/check-citations.py
```

---

## Configuration Files

### `.gitignore`

```gitignore
# Outputs
outputs/
manuscript/_outputs/
_manuscript/

# Dependencies
node_modules/
.venv/
.ruff_cache/
__pycache__/

# OS files
.DS_Store
Thumbs.db

# Editor files
*.swp
*.swo
.idea/
.vscode/

# Quarto
/.quarto/
manuscript/.quarto/
```

### `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.{md,qmd}]
indent_size = 2
max_line_length = off

[*.py]
indent_size = 4

[Makefile]
indent_style = tab
```

---

## Implementation Sequence

Autonomous agents should execute these phases in order:

### Phase 1: Scaffold

Create directory structure and root configuration files.

```
README.md, LICENSE, .gitignore, .editorconfig, Makefile, AGENTS.md, WORKFLOW.md
```

### Phase 2: Quarto Setup

Initialize Quarto manuscript structure.

```
manuscript/_quarto.yml, manuscript/paper.qmd, manuscript/frontmatter.yml, manuscript/references.bib
manuscript/sections/, manuscript/figures/, manuscript/tables/, manuscript/appendix/
manuscript/csl/, manuscript/templates/
```

### Phase 3: Specs Layer

Create specification templates.

```
specs/paper.md, specs/outline.md, specs/journal.md, specs/submission.md
specs/sections/01-introduction.md through 06-conclusion.md
```

### Phase 4: Research Layer

Create research tracking infrastructure.

```
research/claim-ledger.md, research/evidence-matrix.csv
research/terminology-glossary.md, research/timeline.md
research/sources/reading-notes/, research/sources/archival-notes/
```

### Phase 5: Reviews Layer

Create review tracking files.

```
reviews/.review-status.yml
reviews/spec-review.md, reviews/structure-review.md, reviews/argument-review.md
reviews/citation-audit.md, reviews/style-pass.md
```

### Phase 6: Skills Layer

Create agent capability definitions.

```
skills/README.md
skills/writing/plan.md, draft.md, revise.md, style.md
skills/research/sources.md, notes.md, evidence.md, factcheck.md
```

### Phase 7: Tools

Create automation scripts.

```
tools/scripts/anonymize.py, validate-claims.py, check-citations.py
```

### Phase 8: CI/CD

Create GitHub Actions workflows.

```
.github/workflows/render.yml, .github/workflows/checks.yml
```

### Phase 9: Validation

Run `npm run validate` to confirm setup.

---

## Day-to-Day Workflow

1. **Set journal constraints**: Complete `specs/journal.md` and `specs/submission.md`
2. **Write paper spec**: Complete `specs/paper.md` with thesis and claims
3. **Write outline spec**: Complete `specs/outline.md` and section specs
4. **Populate research layer**: Add notes, populate claim ledger and evidence matrix
5. **Draft sections**: Implement `manuscript/sections/*.qmd` with claim anchors
6. **Run acceptance tests**: `npm run validate`
7. **Review cycle**: Complete reviews until all approved
8. **Render and submit**: `npm run anon && npm run render`
