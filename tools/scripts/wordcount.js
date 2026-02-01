#!/usr/bin/env node
// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 Moritz Mähr
// Source: https://github.com/maehr/log

/*
Render wordcount stats only.

Quarto wordcount works as part of rendering, but a full render creates output
files. This script renders to stdout and extracts only the wordcount summary,
discarding the rendered document output.
*/

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const { spawn } = require("node:child_process");

function stripAnsi(s) {
  return s.replace(/\x1b\[[0-9;]*m/g, "");
}

function rmIfExists(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

function main() {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const manuscriptDir = path.join(repoRoot, "manuscript");
  const tmpOutDir = path.join(manuscriptDir, ".wordcount_tmp_out");

  rmIfExists(tmpOutDir);

  const args = [
    "render",
    "paper.qmd",
    "--profile",
    "wordcount",
    "--to",
    "wordcount-html",
    "--output-dir",
    ".wordcount_tmp_out",
  ];

  const child = spawn("quarto", args, {
    cwd: manuscriptDir,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let inBlock = false;
  let sawOverall = false;
  let printed = false;
  const lines = [];

  // quarto-wordcount prints to stderr (Quarto log stream).
  const rl = readline.createInterface({ input: child.stderr });
  rl.on("line", (raw) => {
    const line = stripAnsi(raw);

    if (!inBlock && line.startsWith("Manuscript totals:")) {
      inBlock = true;
    }

    if (!inBlock) return;

    lines.push(line);

    if (line.startsWith("Overall totals:")) {
      sawOverall = true;
      return;
    }

    // Print once we hit the blank line after the overall totals section.
    if (sawOverall && line.trim() === "" && !printed) {
      printed = true;
      process.stdout.write(lines.join("\n").trimEnd() + "\n");
    }
  });

  // Keep a full copy for error reporting.
  let stderrAll = "";
  child.stderr.on("data", (chunk) => {
    stderrAll += chunk.toString("utf8");
  });

  child.on("close", (code) => {
    rl.close();
    rmIfExists(tmpOutDir);

    if (code !== 0) {
      process.stderr.write(stderrAll);
      process.exit(code);
    }

    if (!printed && lines.length > 0) {
      process.stdout.write(lines.join("\n").trimEnd() + "\n");
    }
  });
}

main();
