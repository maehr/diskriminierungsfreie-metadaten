# Agents Tooling Specification

Source repository of the handbook _Diskriminierungssensible Metadatenpraxis_, a Quarto manuscript published on GitHub Pages.
This file follows the shared [Agents Tooling Specification](https://gist.github.com/maehr/6c48ef14f37c9f745fa1fbaa315d106b) for Quarto.
The subset below applies here. The manuscript executes no code chunks, so the engine and freeze rules do not apply.

## 1. Tooling

`package.json` holds the contract. Call a script. Never call the tool that the script wraps.

| Script                     | Purpose                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm run check`           | Prettier check of Markdown, YAML and JSON. Husky runs it before each commit.                          |
| `pnpm run check:citations` | Checks that each `@key` in `manuscript/sections/` exists in `manuscript/references.yaml`. Needs `uv`. |
| `pnpm run check:glossary`  | Checks glossary shortcodes against `manuscript/glossary.yaml`.                                        |
| `pnpm run format`          | Formats Markdown, YAML and JSON. It does not format `.qmd`.                                           |
| `pnpm run render`          | Renders HTML and DOCX into `manuscript/_manuscript/`.                                                 |
| `pnpm run commit`          | Writes a Conventional Commit with commitizen.                                                         |

**Quarto.** CI pins Quarto `1.10.19`. Use the same version locally. [quarto-cli-mcp](https://github.com/maehr/quarto-cli-mcp) renders in a temporary project from an agent session.

**PDF.** CI prints the PDF from the HTML with headless Chrome. The project uses no TeX and no Typst.

**Python.** `uv` runs `tools/scripts/check-citations.py` only. Commit `uv.lock`.

## 2. Standards

- [SemVer 2.0.0](https://semver.org/) for versions.
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.
- [Contributor Covenant 3.0](https://www.contributor-covenant.org/version/3/0/code_of_conduct/) as `CODE_OF_CONDUCT.md`.
- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) as `LICENSE`. SPDX identifier `AGPL-3.0-only`.

## 3. Code

**Preview while you edit.** Run `cd manuscript && quarto preview`. Commit no output from `manuscript/_manuscript/` or `.quarto/`.

**Run no production render and no publish in an agent session** unless the maintainer asks. That covers `quarto publish`, the deploy workflow, and any release artifact.

- Write the manuscript in `manuscript/sections/*.qmd`. `manuscript/index.qmd` holds the metadata and the includes.
- Put figures in `manuscript/images/`. Give each figure a caption and alt text.
- Change `date-modified` in `manuscript/index.qmd` only for an editorial change.
- Keep `specs/` aligned with the manuscript structure.

**Sources.**

- `manuscript/references.yaml` is the source of truth for citations.
- Never invent a source, a citation, or its metadata.
- Use Zotero MCP for retrieval only. Do not write to the Zotero library.

Run all three checks before you hand off:

```bash
pnpm run check && pnpm run check:citations && pnpm run check:glossary
```

## 4. GitHub Workflow

Topic branch and pull request, unless this file says `Git workflow: main`. No push access: `gh repo fork OWNER/REPO --clone`.

PR title: a Conventional Commit. One logical change per PR.

## 5. CI/CD Security

Follow [secure use of Actions](https://docs.github.com/en/actions/reference/security/secure-use).

- Set `permissions: contents: read` at the top level. Widen it per job only where a job needs more.
- Default the repository token to read: `gh api -X PUT repos/OWNER/REPO/actions/permissions/workflow -f default_workflow_permissions=read`.
- Pin an action to a full commit SHA. Verify the SHA against the upstream repository, not a fork. Let Dependabot bump it.
- Never check out fork code under `pull_request_target`. Prefer `workflow_run`, and treat its artifacts as untrusted.
- Never interpolate `github.event.*` into `run:`. Pass the value through `env:` and quote `"$VAR"`.
- Use OIDC and a short-lived cloud role. Do not store a long-lived secret. Keep a secret a scalar, never a JSON blob. Rotate it.
- Gate a deploy on an Environment with required reviewers. Prefer an environment secret over a repository secret.
- Do not use a self-hosted runner on a public repository.
- Cover `.github/workflows/**` in `CODEOWNERS`.
- Require the section 3 gate, CodeQL, and `dependency-review-action`. Run the same gate locally, so CI gives no surprise. On a private repository, confirm the plan covers CodeQL and dependency review first.

## 6. Publishing

The workflow `.github/workflows/quarto-publish.yml` deploys from `main` to the `gh-pages` branch. Never publish the handbook by hand.

- CI renders the handbook, prints the PDF, and adds the first edition from tag `site-v1.0.1` under `v1/`.
- Quarto is pinned in the workflow. Change the pin in a separate pull request.
- Keep the site URL in `manuscript/_quarto.yml`.
- `redirect/` holds the page for the old Quarto Pub address. Only the maintainer publishes it with `quarto publish quarto-pub redirect/index.qmd`.

# Agents CLI Tooling — macOS

This file is an appendix. Append it to a stack specification. Do not use it alone.

Use current stable macOS on Apple Silicon. Use Homebrew for all system tools. A formula puts its binary in `/opt/homebrew/bin`. A cask puts its binary in `/usr/local/bin`. Add both directories to `PATH`. Commit the `Brewfile` and the `Brewfile.lock.json`.

## Brewfile

```ruby
brew "ripgrep"
brew "ripgrep-all"
brew "fd"

brew "rumdl"
brew "lychee"

brew "jq"
brew "yq"
brew "duckdb"

brew "pandoc"
brew "poppler"
brew "qpdf"
cask "quarto"

brew "yt-dlp"
brew "ffmpeg"

brew "node"
brew "uv"
```

- `poppler` gives `pdftotext` and `pdfinfo`.
- `ffmpeg` gives `ffprobe`.
- `rga` calls `pandoc`, `poppler`, and `ffmpeg`. Keep these three formulas.
- `node` runs JavaScript tools. `uv` supplies Python environments.

## PDF and speech

Use the `pdf2md` MCP server for PDF conversion and OCR.
Use the shared `pdf-to-tts` skill to prepare PDF text for speech.
Use the `simple-tts` MCP server for speech conversion.

Use one installation per MCP tool.
Point each client at the same environment or executable.
PDF Inspector is a dependency of `pdf2md`. Install no separate PDF Inspector CLI.

If MCP tools are unavailable, stop and report the connection problem.
Check the client configuration.
Reconnect the server before conversion.

## Verification

```bash
brew bundle check --verbose

for t in rg rga fd rumdl lychee jq yq duckdb pandoc pdftotext \
         pdfinfo qpdf quarto yt-dlp ffmpeg ffprobe node uv; do
  command -v "$t" >/dev/null || echo "missing: $t"
done
```

Before PDF or speech conversion, confirm the required MCP tools in the client.
If a tool is missing, stop and report it. Do not use a different tool.

## Tools

| Task                                      | Tool                    |
| ----------------------------------------- | ----------------------- |
| Text search                               | `rg`                    |
| File search                               | `fd`                    |
| Search in PDF, Office, archive, and media | `rga`                   |
| Markdown lint and format                  | `rumdl`                 |
| Markdown structure                        | `pandoc` and `jq`       |
| YAML front matter                         | `yq`                    |
| Link check                                | `lychee`                |
| QMD and document production               | `quarto`                |
| Format conversion                         | `pandoc`                |
| PDF conversion and OCR                    | `pdf2md` MCP            |
| PDF preparation for speech                | `pdf-to-tts` skill      |
| Speech conversion                         | `simple-tts` MCP        |
| PDF structure                             | `qpdf`                  |
| PDF text and metadata                     | `pdftotext`, `pdfinfo`  |
| Media inspection                          | `ffprobe`               |
| Media transform                           | `ffmpeg`                |
| Remote media                              | `yt-dlp`                |
| JSON                                      | `jq`                    |
| YAML, XML, and TOML                       | `yq`                    |
| CSV, Parquet, and large JSON              | `duckdb`                |
| SQLite                                    | Python only. See Rules. |

## Commands

```bash
rumdl check .          # Lint. Exit code 1 if violations remain.
rumdl fmt .            # Format. Exit code 0 always.

pandoc README.md -f gfm -t json | jq .

yq --front-matter=extract '.title' doc.md      # Read.
yq --front-matter=process -i '.date = now' doc.md   # Write.

lychee --cache --max-concurrency 8 .

pdftotext -layout doc.pdf -
qpdf --check doc.pdf

ffprobe -v error -show_format -show_streams in.mp4

uv run python -c "import sqlite3; print(sqlite3.connect('x.db'))"
```

## Rules

- Read front matter with `extract`. Write it with `process`. `process` prints the full file.
- `yq` gives wrong data if the file has no front matter. Check for `---` on line 1 first.
- Use `yq` for front matter, not `pandoc`. `pandoc` normalizes metadata and cannot write it back.
- Pin `pandoc`. A `jq` filter breaks when the `pandoc-api-version` changes.
- Always use `-layout` with `pdftotext`.
- Use `qpdf` for structure, not for text.
- Run `ffprobe` before `ffmpeg`.
- If `yt-dlp` fails to extract, run `brew upgrade yt-dlp` first.
- Run `lychee` in CI only. It is slow and reports false errors for sites that return 403.
- Access SQLite through Python only. Use `uv run`. Do not use the `sqlite3` CLI.
- Pin `rumdl`. Keep MCP dependencies in their project lockfiles.

## Prohibitions

- Do not add a Markdown tool if `pandoc`, `rumdl`, or `yq` can do the task.
- Do not install a compiler toolchain to get one CLI.
- Do not add interactive tools. `fzf`, `bat`, `eza`, `zoxide`, `glow`, and `bottom` are user preferences.
- Do not convert a file if direct inspection is sufficient.

## Principle

```text
search -> inspect -> validate -> extract -> transform
```

For Markdown:

```text
rg -> rumdl -> pandoc + jq -> quarto
```
