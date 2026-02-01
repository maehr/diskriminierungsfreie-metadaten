.PHONY: all render anon clean validate check-citations lint format

MANUSCRIPT_DIR := manuscript
OUTPUT_DIR := outputs

all: validate render

render:
	cd $(MANUSCRIPT_DIR) && quarto render

anon:
	cd $(MANUSCRIPT_DIR) && quarto render --profile submission

validate: check-citations lint

check-citations:
	uv run tools/scripts/check-citations.py

lint:
	npx prettier --check "**/*.{md,yml,yaml,json}"
	npx prettier --check --parser markdown "**/*.qmd"
	npx prettier --check $(MANUSCRIPT_DIR)/references.yaml

format:
	npx prettier --write "**/*.{md,yml,yaml,json}"
	npx prettier --write --parser markdown "**/*.qmd"
	npx prettier --write $(MANUSCRIPT_DIR)/references.yaml

clean:
	rm -rf $(OUTPUT_DIR)/*
