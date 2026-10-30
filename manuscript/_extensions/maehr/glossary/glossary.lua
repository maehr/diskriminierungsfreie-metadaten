-- Glossary.lua
-- Author: Lisa DeBruine

-- Global glossary table
globalGlossaryTable = {}

-- Helper Functions

local function addHTMLDeps()
  -- add the HTML requirements for the library used
    quarto.doc.add_html_dependency({
    name = 'glossary',
    stylesheets = {'glossary.css'},
    scripts = {'glossary.js'}
  })
end

local function kwExists(kwargs, keyword)
    for key, value in pairs(kwargs) do
        if key == keyword then
            return true
        end
    end
    return false
end

-- Function to sort a Lua table by keys
function sortByKeys(tbl)
    local sortedKeys = {}

    -- Extract keys from the table and store them in the 'sortedKeys' array
    for key, _ in pairs(tbl) do
        table.insert(sortedKeys, key)
    end

    -- Sort the keys alphabetically
    table.sort(sortedKeys)

    -- Create a new table with the sorted keys
    local sortedTable = {}
    for _, key in pairs(sortedKeys) do
        sortedTable[key] = tbl[key]
    end

    return sortedTable
end

local function read_metadata_file(fname)
  local metafile = io.open(fname, 'r')
  local content = metafile:read("*a")
  metafile:close()
  local metadata = pandoc.read(content, "markdown").meta
  return metadata
end

local function readGlossary(path)
  local f = io.open(path, "r")
  if not f then
    io.stderr:write("Cannot open file " .. path)
  else
    local lines = f:read("*all")
    f:close()
    return(lines)
  end
end

local function parseInlines(text)
  local ok, doc = pcall(pandoc.read, text, "markdown")
  if ok and doc ~= nil and #doc.blocks > 0 then
    local first = doc.blocks[1]
    if first.t == "Para" or first.t == "Plain" then
      return first.content
    end
  end
  return { pandoc.Str(text) }
end

local function parseBlocks(text)
  if text == nil or text == "" then
    return {}
  end
  local ok, doc = pcall(pandoc.read, text, "markdown")
  if ok and doc ~= nil and doc.blocks ~= nil then
    return doc.blocks
  end
  return { pandoc.Para({ pandoc.Str(text) }) }
end

local function loadGlossaryLookup(path)
  local metafile = io.open(path, "r")
  if not metafile then
    io.stderr:write("Cannot open file " .. path .. "\n")
    return {}
  end

  local content = "---\n" .. metafile:read("*a") .. "\n---\n"
  metafile:close()

  local ok, parsed = pcall(pandoc.read, content, "markdown")
  if not ok or parsed == nil or parsed.meta == nil then
    io.stderr:write("Cannot parse glossary file " .. path .. "\n")
    return {}
  end

  local lookup = {}
  for key, value in pairs(parsed.meta) do
    local normalized = string.lower(key)
    lookup[normalized] = pandoc.utils.stringify(value)
  end

  return lookup
end

---Merge user provided options with defaults
---@param userOptions table
local function mergeOptions(userOptions, meta)
  local defaultOptions = {
    path = "glossary.yml",
    popup = "click",
    show = true,
    add_to_table = true
  }

  -- override with meta values first
  if meta.glossary ~= nil then
    for k, v in pairs(meta.glossary) do
      local value = pandoc.utils.stringify(v)
      if value == 'true' then value = true end
      if value == 'false' then value = false end
      defaultOptions[k] = value
    end
  end

  -- then override with function keyword values
  if userOptions ~= nil then
    for k, v in pairs(userOptions) do
      local value = pandoc.utils.stringify(v)
      if value == 'true' then value = true end
      if value == 'false' then value = false end
      defaultOptions[k] = value
    end
  end

  return defaultOptions
end


-- Main Glossary Function Shortcode

return {

["glossary"] = function(args, kwargs, meta)

  local is_html = quarto.doc.isFormat("html:js")

  if is_html then
    addHTMLDeps()
  end

  -- create glossary table
  if kwExists(kwargs, "table") then
    local sortedTable = sortByKeys(globalGlossaryTable)

    if is_html then
      local gt = "<table class='glossary_table'>\n"
      gt = gt .. "<tr><th> Term </th><th> Definition </th></tr>\n"

      for key, value in pairs(sortedTable) do
          gt = gt .. "<tr><td>" .. key
          gt = gt .. "</td><td>" .. value .. "</td></tr>\n"
      end
      gt = gt .. "</table>"

      return pandoc.RawBlock('html', gt)
    end

    local entries = {}
    for key, value in pairs(sortedTable) do
      local termInlines = parseInlines(key)
      local definitionBlocks = parseBlocks(value)
      table.insert(entries, { termInlines, { definitionBlocks } })
    end

    return pandoc.DefinitionList(entries)
  end

  -- or set up in-text term
  local options = mergeOptions(kwargs, meta)

  local display = pandoc.utils.stringify(args[1])
  local term = string.lower(display)

  if kwExists(kwargs, "display") then
    display = pandoc.utils.stringify(kwargs.display)
  end

  -- get definition
  local def = ""
  if kwExists(kwargs, "def") then
    def = pandoc.utils.stringify(kwargs.def)
  else
    local glossary = loadGlossaryLookup(options.path)
    if kwExists(glossary, term) then
      def = glossary[term]
    end
  end

  -- add to global table
  if options.add_to_table then
    globalGlossaryTable[term] = def
  end

  if is_html then
    -- Generate unique ID for this glossary term (still needed for potential future use)
    local glossary_id = "glossary-" .. term:gsub("%s+", "-"):gsub("[^%w%-]", "") .. "-" .. math.random(1000, 9999)

    if options.popup == "click" then
      -- Use Bootstrap popover with accessible attributes
      glosstext = "<button class='glossary' " ..
                  "id='" .. glossary_id .. "' " ..
                  "data-bs-toggle='popover' " ..
                  "data-bs-content='" .. def:gsub("'", "&apos;") .. "' " ..
                  "data-bs-trigger='click' " ..
                  "data-bs-placement='top' " ..
                  "tabindex='0' " ..
                  "data-glossary-term='" .. term .. "'>" ..
                  display .. "</button>"
    elseif options.popup == "none" then
      glosstext = "<span class='glossary'>" .. display .. "</span>"
    else
      -- Default to click behavior for any other option (including former "hover")
      glosstext = "<button class='glossary' " ..
                  "id='" .. glossary_id .. "' " ..
                  "data-bs-toggle='popover' " ..
                  "data-bs-content='" .. def:gsub("'", "&apos;") .. "' " ..
                  "data-bs-trigger='click' " ..
                  "data-bs-placement='top' " ..
                  "tabindex='0' " ..
                  "data-glossary-term='" .. term .. "'>" ..
                  display .. "</button>"
    end

    return pandoc.RawInline("html", glosstext)
  end

  local inlines = parseInlines(display)
  if options.popup == "none" or def == nil or def == "" then
    return pandoc.Span(inlines)
  end

  table.insert(inlines, pandoc.Note(parseBlocks(def)))
  return pandoc.Span(inlines)

end

}
