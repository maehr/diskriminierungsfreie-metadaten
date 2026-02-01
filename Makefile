.PHONY: all render anon clean validate check-claims check-citations lint format

MANUSCRIPT_DIR := manuscript
OUTPUT_DIR := outputs

all: validate render

render:
	cd $(MANUSCRIPT_DIR) && quarto render

anon:
	cd $(MANUSCRIPT_DIR) && quarto render --profile submission

validate: check-claims check-citations lint

check-claims:
	uv run tools/scripts/validate-claims.py

check-citations:
	uv run tools/scripts/check-citations.py

lint:
	npx prettier --check "**/*.{md,yml,yaml,json}"
	npx prettier --check --parser markdown "**/*.qmd"
	npx bibtex-tidy $(MANUSCRIPT_DIR)/references.bib --omit=abstract,file,doi,issn --sort=author --curly --numeric --modify

format:
	npx prettier --write "**/*.{md,yml,yaml,json}"
	npx prettier --write --parser markdown "**/*.qmd"
	npx bibtex-tidy $(MANUSCRIPT_DIR)/references.bib --omit=abstract,file,doi,issn --sort=author --curly --numeric --modify

clean:
	rm -rf $(OUTPUT_DIR)/*
