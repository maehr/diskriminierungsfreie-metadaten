# Paper Specification

Handbook-level project spec (not a journal paper).

## Work Type

- genre: handbook / practice guide
- title: Diskriminierungssensible Metadatenpraxis
- subtitle: Ein Handbuch zur ethischen Beschreibung historischer Quellen und Forschungsdaten
- language: de-CH

## Scope

- Covers theory (key concepts) and practice (workflow-oriented guidance) for discrimination-sensitive metadata work on historical sources and research data.

## Publication Mode

- Self-published on GitHub Pages: <https://maehr.github.io/diskriminierungsfreie-metadaten/>
- Archived releases on Zenodo (concept DOI 10.5281/zenodo.11124719)
- No enforced word count constraints

## Structure Invariants

- `manuscript/index.qmd` is the entry point and includes section files from `manuscript/sections/`.
- Bibliography source of truth is `manuscript/references.yaml`.

## Acceptance Criteria

- The release gate below is authoritative.
- Additional paper-level invariant: all citations used in `manuscript/sections/*.qmd` exist in `manuscript/references.yaml`.

## Register

- register: academic-practice
- citation style: author-date
- word count limit: none

## Release Gate

- [ ] `pnpm run check`, `pnpm run check:citations` and `pnpm run check:glossary` pass
- [ ] Version and dates agree in `CHANGELOG.md`, `CITATION.cff` and `manuscript/index.qmd`
- [ ] `date-modified` in `manuscript/index.qmd` changes only for editorial changes
- [ ] The handbook renders (HTML, DOCX, PDF)
- [ ] CI publishes the web build to GitHub Pages
- [ ] For a final release: create a GitHub release, archive it on Zenodo and record the version DOI
