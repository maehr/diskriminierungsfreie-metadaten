#!/usr/bin/env bash
set -euo pipefail

echo "==> Rendering Quarto manuscript to JSON..."
cd "$(dirname "$0")/../manuscript"
quarto render index.qmd --to json

cd ..

echo "==> Building Elm application..."
cd app
pnpm exec elm make src/Main.elm --optimize --output=public/app.js

echo "==> Building Tailwind CSS..."
pnpm exec tailwindcss -i styles/input.css -o public/tailwind.css --minify

echo "==> Done! App ready in app/public/"
