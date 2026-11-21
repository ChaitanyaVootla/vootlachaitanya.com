#!/usr/bin/env bash
# Compile resume/resume.tex and publish it as public/Resume.pdf.
#
#   npm run resume
#
# Needs Tectonic (https://tectonic-typesetting.github.io), either on PATH or at
# ~/tools/tectonic/tectonic(.exe). The source also compiles unchanged on
# Overleaf: download the PDF there and save it as public/Resume.pdf instead.

set -euo pipefail
cd "$(dirname "$0")/.."

tectonic="$(command -v tectonic || true)"
for candidate in "$HOME/tools/tectonic/tectonic.exe" "$HOME/tools/tectonic/tectonic"; do
  [[ -z "$tectonic" && -x "$candidate" ]] && tectonic="$candidate"
done
if [[ -z "$tectonic" ]]; then
  echo "Tectonic not found. Install it, or compile resume/resume.tex on Overleaf." >&2
  exit 1
fi

out="$(mktemp -d)"
trap 'rm -rf "$out"' EXIT
"$tectonic" resume/resume.tex --outdir "$out" 2>&1 | grep -vE "^note: |Fontconfig error" || true
cp "$out/resume.pdf" public/Resume.pdf
echo "Wrote public/Resume.pdf ($(wc -c < public/Resume.pdf) bytes). Deploy with: npm run build && npm run deploy"
