# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/maehr/diskriminierungsfreie-metadaten/compare/v1.0.1...HEAD)

### Changed

- Moved the current version (2.0.0-alpha.0) to GitHub Pages: <https://maehr.github.io/diskriminierungsfreie-metadaten/>. Quarto Pub is retired and redirects there.
- Version 1.0.1 is now at <https://maehr.github.io/diskriminierungsfreie-metadaten/v1/>. This web copy is the last GitHub Pages build (`gh-pages` commit `34355b6`, tag `site-v1.0.1`). It includes two notice edits after the release (`bcf1ee7`, `f99c33f`).
- The website shows a fixed revision date. The build no longer sets it from file times.
- Corrected the release date of v1.0.1 to 2025-09-07.
- Revised the manuscript after external review #2 ([#42](https://github.com/maehr/diskriminierungsfreie-metadaten/issues/42)). The introduction states the scope and the limits. Section 3.2 separates source statement, description, contextualization and interpretation. Statements on FAIR, Dublin Core, identifiers and proprietary systems are corrected. Section 7.2 gives four deletion procedures. Statistical methods are optional. Section 1.3 has a worked decision example from Stadt.Geschichte.Basel. Section 5.5 defines a minimal quality check.
- Section references show the visible chapter numbers. Typos and three bibliography entries are corrected.
- The bibliography has entries for all works in the decision tree of the appendix. The entry for Kaiser et al. (2023) has its journal title.
- Section 7.1 names BagIt and RO-Crate. The introduction limits its statement on catalogue practice to the Basel example. An unsupported statement on DE-BIAS is removed.

### Fixed

- The citation check ignores code blocks and code spans.
- The glossary check finds the term after a named argument. It reports a shortcode without a term.
- The glossary filter reports a shortcode without a term and continues the render.

## [v2.0.0-alpha.0] - 2026-02-10

Public working manuscript of the Living Document, first published on Quarto Pub. It has no DOI of its own.

### Changed

- New title: _Diskriminierungssensible Metadatenpraxis. Ein Handbuch zur ethischen Beschreibung historischer Quellen und Forschungsdaten_.
- New structure: the practice part comes first, the theory part follows.
- New glossary, checklist and appendix on seven levels of metadata standards.

## [v1.0.1](https://github.com/maehr/diskriminierungsfreie-metadaten/releases/tag/v1.0.1) - 2025-09-07

### Features

- Enhanced development environment with comprehensive Docker setup
- Automated changelog generation using git-cliff
- Improved DOI management with automated fetch scripts
- Enhanced GitHub workflows for publishing and validation

### Documentation

- Improved README with GitHub Codespaces integration
- Enhanced contribution guidelines with DOI management instructions
- Better development setup documentation
- Added comprehensive issue templates

### Miscellaneous Tasks

- Updated development dependencies and tooling
- Improved code formatting and linting setup
- Enhanced GitHub Actions workflows

### References

- Archived version: [DOI: 10.5281/zenodo.17073511](https://doi.org/10.5281/zenodo.17073511)

## [v1.0.0](https://github.com/maehr/diskriminierungsfreie-metadaten/releases/tag/v1.0.0) - 2024-06-03

### Features

- Initial version of the handbook for creating discrimination-free metadata for historical sources and research data
- Documentation of experiences from the historical research project Stadt.Geschichte.Basel
- Comprehensive guidelines and best practices for metadata creation
- Licensed under AGPL-3.0 and CC BY-SA 4.0

### References

- Archived version: [DOI: 10.5281/zenodo.11124720](https://doi.org/10.5281/zenodo.11124720)
