# Implementation Plan v3

Canonical execution plan for handbook completion and release.

Last updated: 2026-02-10
Supersedes: `specs/implementation-plan-2.md`
Sources consolidated: `reviews/external/review-meeting-notes.md`, `reviews/missing-references.md`, section specs in `specs/sections/*.md`

## Scope

- Keep one canonical implementation tracker in this file.
- Align specs, reviews, and release checklist.
- Close remaining citation, structure, and consistency gaps before publication.

## Action Register

| ID  | Priority | Source                          | Target files                                                                                                                                                            | Action                                                                                       | Status | Done criteria                                                     |
| --- | -------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------- |
| A1  | High     | Planning audit                  | `specs/implementation-plan.md`                                                                                                                                          | Consolidate all active work into one plan with explicit status and closure criteria.         | Done   | This file is canonical; no parallel implementation plan exists.   |
| A2  | High     | External review + section specs | `specs/sections/00-frontmatter.md`, `specs/sections/03-danksagung.md`                                                                                                   | Resolve conflicting guidance (content-note wording; acknowledgement event retention policy). | Done   | Section specs and plan no longer prescribe contradictory edits.   |
| A3  | High     | Citation backlog                | `reviews/missing-references.md`, `manuscript/references.yaml`                                                                                                           | Rebaseline missing citekeys and split must-have vs optional references.                      | Done   | Missing-reference tracker is current and prioritized.             |
| A4  | High     | Internal reviews                | `reviews/spec-review.md`, `reviews/argument-review.md`, `reviews/citation-audit.md`, `reviews/structure-review.md`, `reviews/style-pass.md`                             | Replace placeholder templates with dated snapshot reviews and concrete findings.             | Done   | No core review file remains a blank pending template.             |
| A5  | Medium   | External review + section specs | `specs/sections/11-1-planung-und-konzeption.md`, `specs/sections/13-3-datenverarbeitung-und-anreicherung.md`, `specs/sections/05-diskriminierung-in-und-durch-daten.md` | Reconcile stale TODO wording with current manuscript state (crossrefs/markers).              | Done   | TODO notes reflect only still-open work.                          |
| A6  | Medium   | Orphaned planning artifacts     | `reviews/external/review-summary.md`                                                                                                                                    | Remove duplicated external review summary after migration to canonical plan.                 | Done   | Duplicate summary removed; meeting notes remain canonical source. |
| A7  | Medium   | Acceptance criteria drift       | `specs/paper.md`, `specs/submission.md`                                                                                                                                 | Keep one release gate definition and cross-link from supporting specs.                       | Done   | Release gate is unambiguous across specs.                         |
| A8  | Medium   | Release execution               | `specs/submission.md` and render outputs                                                                                                                                | Complete release checklist (validate/render/publish/Zenodo).                                 | Open   | All submission checklist items complete.                          |

## Action Register (Series B: Content & Refinement)

| ID  | Priority | Source                      | Target files                                                                                                                                     | Action                                                                                                                               | Status | Done criteria                                                                                           |
| --- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------- |
| B1  | High     | External review + ref audit | `manuscript/sections/04-theorie-01-diskriminierung-in-und-durch-daten.qmd`, `manuscript/sections/04-theorie-02-verzerrungen-und-fehler-bias.qmd` | Implement scientific debate sections (Bias vs. Diskriminierung; Intersektionalitaet; historische Begriffe) with must-have citations. | Open   | Sections contain argumentatively complete text with traceable citations and no unresolved placeholders. |
| B2  | High     | Structural review           | `manuscript/index.qmd`, `specs/outline.md`                                                                                                       | Ensure manuscript order follows practice-first sequence before theory.                                                               | Done   | Index and outline are aligned on practice-before-theory ordering.                                       |
| B3  | Medium   | Editorial review            | `manuscript/index.qmd`, frontmatter files                                                                                                        | Apply wording fixes (subtitle, target audience framing, phrasing cleanups).                                                          | Done   | Required wording updates integrated and consistent across frontmatter/index.                            |
| B4  | Medium   | Technical debt review       | glossary and cross-reference touchpoints in `manuscript/sections/*.qmd`                                                                          | Resolve glossary and cross-reference debt (broken/unclear refs, missing glossary consistency).                                       | Done   | `npm run validate` passes with no glossary/cross-reference errors.                                      |
| B5  | Medium   | Literature coverage review  | `reviews/missing-references.md`, `manuscript/references.yaml`, theory sections                                                                   | Expand German- and Europe-focused literature coverage and align citations in theory/practice chapters.                               | Open   | Coverage gaps are documented and key German/European references are integrated in relevant sections.    |

## Current Priorities (Execution Order)

1. Execute B1 (scientific debates in theory chapters).
2. Execute B5 (German/European literature coverage expansion).
3. Execute release gate checklist (A8).

## Decision Log

- 2026-02-10: `specs/implementation-plan-2.md` retired; this file is now the only implementation plan.
- 2026-02-10: External review meeting notes remain source-of-truth; derived duplicate summary removed.
- 2026-02-10: Citation tracker split into must-have vs optional tiers in `reviews/missing-references.md`.
- 2026-02-10: `specs/submission.md` designated as authoritative release gate; `specs/paper.md` now cross-links it.
- 2026-02-10: Stale section-spec TODO markers reconciled in section specs 05/11/13.
- 2026-02-10: Series B action register added; B2 marked done because manuscript and outline already follow practice-before-theory order.
- 2026-02-10: B3 completed (subtitle and target-audience wording aligned in index/frontmatter).
- 2026-02-10: B5 added and kept open to address German and European literature coverage gaps.
- 2026-02-10: B4 completed after glossary shortcode normalization and cross-reference consistency check.
- 2026-02-10: B5 first pass completed (German/European references integrated in theory and practice introductions); B5 remains open for further source expansion.

## Validation Rule

After every change batch, run:

```bash
npm run validate
```

## Release Gate

- [ ] `npm run validate` passes
- [ ] All citations in `manuscript/sections/*.qmd` resolve in `manuscript/references.yaml`
- [ ] Version/date metadata reviewed
- [ ] Quarto render completes successfully
- [ ] Web build published
- [ ] Zenodo release created or updated with DOI
