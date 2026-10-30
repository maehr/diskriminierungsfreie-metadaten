# Submission Specification

publication_mode: self-publish
anonymization_required: false

publication_targets:

- github-pages
- zenodo

## Authoritative Release Gate

This section is the authoritative release gate for publication readiness.

- [ ] `npm run validate` passes
- [ ] Version + date reviewed (CHANGELOG/CITATION metadata as applicable)
- [ ] Render handbook (Quarto)
- [ ] Publish web build (GitHub Pages / Quarto publish)
- [ ] Create Zenodo release / upload and record DOI if available

## Venue Submission (Future)

If this handbook is later submitted to a venue (journal/publisher), define venue
constraints here (word count, anonymization rules, formatting requirements) and
update `specs/journal.md` accordingly.
