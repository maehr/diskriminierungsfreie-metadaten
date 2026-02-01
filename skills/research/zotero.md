# Skill: Zotero MCP Research

## Allowed

- Search the Zotero library (title/creator/year, keywords, tags)
- Fetch item metadata, notes, annotations, and full text when available
- Create Zotero notes to capture provenance and decisions
- Add BibTeX entries for selected items to `manuscript/references.bib` (verifying key fields)

## Forbidden

- Fabricate sources or bibliographic metadata
- Cite items that are not present in `manuscript/references.bib`
- Treat Zotero metadata as authoritative when it conflicts with the underlying source

## Inputs

- User query (keywords, author, year, tags)
- Zotero library (via Zotero MCP)
- `manuscript/references.bib`

## Outputs

- `manuscript/references.bib`
- `research/sources/reading-notes/*`
- `research/claim-ledger.md` (source IDs / coverage updates)
