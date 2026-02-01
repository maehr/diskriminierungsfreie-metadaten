-- SPDX-License-Identifier: AGPL-3.0-only
-- Copyright (c) 2026 Moritz Mähr
-- Source: https://github.com/maehr/agentic-scientific-paper-template/manuscript/_extensions/anonymize-submission
--
-- Quarto / Pandoc Lua filter for anonymized submission renders.
--
-- Applied via `manuscript/_quarto-submission.yml`.
--
-- Responsibilities:
-- - Redact identifying metadata (authors, affiliations, declarations)
-- - Omit the "Declarations" section content from anonymized submissions

local function redact_meta_string(m, key)
  if m[key] ~= nil then
    m[key] = pandoc.MetaString("[REDACTED FOR REVIEW]")
  end
end

local function anonymize_meta_inplace(m)
  -- Replace authors with a single anonymous author.
  -- Quarto/pandoc can carry multiple author representations (`author`, `authors`,
  -- plus derived `by-author` / `by-affiliation`). We collapse everything to a
  -- single anonymous author for submission renders.

  m["authors"] = nil
  m["by-author"] = nil
  m["by-affiliation"] = nil

  m["author"] = pandoc.MetaList({
    pandoc.MetaInlines({ pandoc.Str("Anonymous") }),
  })

  -- Drop affiliation metadata (Quarto supports both `affiliation` and `affiliations`)
  m["affiliation"] = nil
  m["affiliations"] = nil

  -- Redact common declaration fields
  redact_meta_string(m, "acknowledgements")
  redact_meta_string(m, "author_contributions")
  redact_meta_string(m, "funding")
  redact_meta_string(m, "competing_interests")
  redact_meta_string(m, "data_availability")
  redact_meta_string(m, "ethics")

end

function Meta(m)
  anonymize_meta_inplace(m)
  return m
end

function Pandoc(doc)
  -- Note: when a Pandoc() callback is present, some Quarto/Pandoc execution
  -- paths may not invoke Meta() separately, so we also anonymize metadata here.
  anonymize_meta_inplace(doc.meta)

  local out = {}
  local skipping = false
  local skip_level = nil

  for _, blk in ipairs(doc.blocks) do
    if blk.t == "Header" then
      local id = blk.identifier

      -- Enter skip mode at the Declarations section.
      if id == "sec-declarations" then
        skipping = true
        skip_level = blk.level
      end

      -- Exit skip mode when we hit a header at the same or higher level.
      if skipping and id ~= "sec-declarations" and skip_level ~= nil and blk.level <= skip_level then
        skipping = false
        skip_level = nil
      end
    end

    if not skipping then
      table.insert(out, blk)
    end
  end

  doc.blocks = out
  return doc
end
