# Spec Review

Status: open
Reviewer: Planner
Date: 2026-02-10

## Summary

- Spec corpus exists and is structurally complete.
- Planning and review workflow had drift due to duplicate implementation plans and placeholder review docs.
- Canonicalization work started via `specs/implementation-plan.md` v3.

## Issues Found

- Duplicate implementation plans created competing sources of truth.
- Contradictory guidance across specs (`00-frontmatter`, `03-danksagung`).
- Several section-spec TODO markers likely stale relative to current manuscript state.

## Recommendations

- Keep only one implementation plan and archive/remove superseded variants.
- Resolve contradictory wording/policies directly in section specs.
- Refresh section-spec TODOs against the current manuscript.

## Approval Criteria Met

- [x] Project spec complete (`specs/journal.md`, `specs/submission.md`)
- [x] Outline + section specs exist (`specs/outline.md`, `specs/sections/*.md`)
- [ ] Spec consistency conflicts resolved
