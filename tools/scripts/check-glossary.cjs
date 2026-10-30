#!/usr/bin/env node
// SPDX-License-Identifier: AGPL-3.0-only

const fs = require("node:fs");
const path = require("node:path");

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getGlossaryKeys(glossaryPath) {
  const text = fs.readFileSync(glossaryPath, "utf8");
  const keys = [];

  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(?:"([^"]+)"|([^:\s][^:]*)):\s*>\s*$/);
    if (!m) continue;
    const key = (m[1] || m[2] || "").trim();
    if (key) keys.push(key);
  }

  return keys;
}

function getQmdFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getQmdFiles(p));
    } else if (entry.isFile() && p.endsWith(".qmd")) {
      files.push(p);
    }
  }
  return files;
}

function parseShortcodeKeys(line) {
  const keys = [];
  const re = /\{\{<\s*glossary\s+([^>]+?)\s*>\}\}/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    const args = m[1].trim();
    if (/^[A-Za-z_][A-Za-z0-9_-]*\s*=/.test(args)) {
      // Parameter-only shortcodes such as {{< glossary table=true >}}
      continue;
    }
    const quoted = args.match(/^"([^"]+)"/);
    if (quoted) {
      keys.push(quoted[1]);
      continue;
    }
    const token = args.split(/\s+/)[0];
    if (token) keys.push(token);
  }
  return keys;
}

const TERM_EXCLUDE = new Set(["API", "CARE", "EDM", "FAIR", "JSON"]);
const TERM_FORCE_INCLUDE = new Set(["Recall", "Precision"]);

function isTrackedTerm(key) {
  if (TERM_FORCE_INCLUDE.has(key)) return true;
  if (TERM_EXCLUDE.has(key)) return false;
  if (/\s/.test(key)) return false;

  const hasDotOrSlash = /[./]/.test(key);
  const hasAcronymHyphen = /-/.test(key) && /^[A-Z0-9-]+$/.test(key);
  const isUpperAcronym = /^[A-Z0-9]{2,12}$/.test(key);

  return hasDotOrSlash || hasAcronymHyphen || isUpperAcronym;
}

function checkFile(filePath, trackedTerms, glossarySet) {
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  const issues = [];
  const unknownShortcodes = [];

  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    for (const key of parseShortcodeKeys(line)) {
      if (!glossarySet.has(key)) {
        unknownShortcodes.push({ filePath, lineNo, key });
      }
    }

    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("<!--") && trimmed.endsWith("-->")) continue;

    const withoutShortcodes = line.replace(
      /\{\{<\s*glossary\s+[^>]+?\s*>\}\}/g,
      "",
    );
    if (!withoutShortcodes.trim()) continue;

    for (const term of trackedTerms) {
      const re = new RegExp(
        `(^|[^\\p{L}\\p{N}_])${escapeRegExp(term)}([^\\p{L}\\p{N}_]|$)`,
        "u",
      );
      if (re.test(withoutShortcodes)) {
        issues.push({ filePath, lineNo, term, line: line.trim() });
      }
    }
  }

  return { issues, unknownShortcodes };
}

function rel(repoRoot, p) {
  return path.relative(repoRoot, p) || p;
}

function main() {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const glossaryPath = path.join(repoRoot, "manuscript", "glossary.yaml");
  const manuscriptRoot = path.join(repoRoot, "manuscript", "sections");

  const glossaryKeys = getGlossaryKeys(glossaryPath);
  const glossarySet = new Set(glossaryKeys);
  const trackedTerms = glossaryKeys.filter(isTrackedTerm);

  const qmdFiles = getQmdFiles(manuscriptRoot);

  const allIssues = [];
  const allUnknown = [];

  for (const filePath of qmdFiles) {
    const { issues, unknownShortcodes } = checkFile(
      filePath,
      trackedTerms,
      glossarySet,
    );
    allIssues.push(...issues);
    allUnknown.push(...unknownShortcodes);
  }

  if (allUnknown.length > 0) {
    console.error("Unknown glossary keys in shortcodes:");
    for (const x of allUnknown) {
      console.error(`- ${rel(repoRoot, x.filePath)}:${x.lineNo} -> ${x.key}`);
    }
  }

  if (allIssues.length > 0) {
    console.error("Potential unlinked glossary terms:");
    for (const x of allIssues) {
      console.error(
        `- ${rel(repoRoot, x.filePath)}:${x.lineNo} [${x.term}] ${x.line}`,
      );
    }
  }

  if (allUnknown.length === 0 && allIssues.length === 0) {
    console.log(
      "Glossary check passed: shortcodes valid and tracked terms linked.",
    );
    return;
  }

  process.exit(1);
}

main();
