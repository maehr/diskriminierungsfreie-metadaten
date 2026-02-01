# Paper Specification

Handbook-level project spec (not a journal paper).

## Work Type

- genre: handbook / practice guide
- title: Diskriminierungssensible Metadatenpraxis
- subtitle: Ein Handbuch zur ethischen Auszeichnung historischer Quellen und Forschungsdaten
- language: de-CH

## Scope

- Covers theory (key concepts) and practice (workflow-oriented guidance) for discrimination-sensitive metadata work on historical sources and research data.

## Publication Mode

- Self-published (Zenodo + GitHub Pages / Quarto publish)
- No enforced word count constraints

## Structure Invariants

- `manuscript/index.qmd` is the entry point and includes section files from `manuscript/sections/`.
- Bibliography source of truth is `manuscript/references.yaml`.

## Acceptance Criteria

- [ ] `npm run validate` passes locally and in CI
- [ ] All citations used in `manuscript/sections/*.qmd` exist in `manuscript/references.yaml`
