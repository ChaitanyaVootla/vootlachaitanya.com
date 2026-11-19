#!/usr/bin/env bash
# Publish ./out to the S3 bucket behind vootlachaitanya.com and refresh CloudFront.
#
#   npm run build && npm run deploy            upload new and changed files
#   npm run deploy -- --prune                  also delete bucket files that are not in ./out
#   npm run deploy -- --dry-run                show what would change, touch nothing
#
# Credentials come from the usual AWS places (AWS_ACCESS_KEY_ID /
# AWS_SECRET_ACCESS_KEY in the environment, or AWS_PROFILE). The identity needs
# s3:PutObject / s3:ListBucket (and s3:DeleteObject for --prune) on the bucket,
# plus cloudfront:CreateInvalidation on the distribution.

set -euo pipefail

BUCKET="${SITE_BUCKET:-vootlachaitanya-com-site}"
DISTRIBUTION="${SITE_DISTRIBUTION:-E12N8HOCSGZRTZ}"
OUT="${SITE_OUT:-out}"

# Git Bash on Windows rewrites arguments that look like paths ("/*" becomes
# "C:/Program Files/Git/*"), which would break the invalidation path.
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"

extra=()
dry_run=false
for arg in "$@"; do
  case "$arg" in
    --prune) extra+=(--delete) ;;
    --dry-run) extra+=(--dryrun); dry_run=true ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

cd "$(dirname "$0")/.."
if [[ ! -f "$OUT/index.html" ]]; then
  echo "No build found in ./$OUT. Run: npm run build" >&2
  exit 1
fi

target="s3://$BUCKET"
short="public, max-age=60, s-maxage=300"
echo "Deploying ./$OUT to $target as $(aws sts get-caller-identity --query Arn --output text)"

# Upload the part of ./out picked by the filters that follow the cache header.
sync() {
  local cache="$1"
  shift
  aws s3 sync "$OUT" "$target" --cache-control "$cache" --only-show-errors "$@" ${extra[@]+"${extra[@]}"}
}

# 1. Fingerprinted build assets never change under the same name: cache for a year.
#    Fonts get an explicit type for the same reason as WebP below.
forever="public, max-age=31536000, immutable"
sync "$forever" --exclude "*" --include "_next/static/*.woff2" --content-type "font/woff2"
sync "$forever" --exclude "*" --include "_next/static/*" --exclude "*.woff2"

# 2. Images and the resume keep their names when they change, so the cache is short.
#    WebP goes first with an explicit type: the AWS CLI on Windows does not
#    know the extension and would upload it as binary/octet-stream.
media="public, max-age=3600, s-maxage=86400"
sync "$media" --exclude "*" --include "images/*.webp" --content-type "image/webp"
sync "$media" \
  --exclude "*" --include "images/*" --include "*.pdf" --include "*.svg" --include "*.ico" \
  --exclude "_next/static/*" --exclude "*.webp"

# 3. Text for agents and crawlers. The type and charset are set by hand:
#    S3 does not know .md, and without a charset the dashes turn to mojibake.
sync "$short" --exclude "*" --include "*.md" \
  --content-type "text/markdown; charset=utf-8"
sync "$short" --exclude "*" --include "llms.txt" --include "llms-full.txt" --include "robots.txt" \
  --content-type "text/plain; charset=utf-8"

# 4. The share images are written without a file extension, so S3 cannot guess their type.
sync "public, max-age=300, s-maxage=86400" \
  --exclude "*" --include "opengraph-image" --include "twitter-image" \
  --content-type "image/png"

# 5. Everything else: pages and the data Next.js writes next to each page.
sync "$short" \
  --exclude "_next/static/*" --exclude "images/*" --exclude "*.pdf" --exclude "*.svg" --exclude "*.ico" \
  --exclude "*.md" --exclude "llms.txt" --exclude "llms-full.txt" --exclude "robots.txt" \
  --exclude "opengraph-image" --exclude "twitter-image"

if $dry_run; then
  echo "Dry run finished. Nothing was uploaded and the CDN was left alone."
  exit 0
fi

# 6. Tell CloudFront to fetch the new copies.
invalidation=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION" --paths "/*" \
  --query "Invalidation.Id" --output text)
echo "Uploaded. CloudFront invalidation $invalidation started (usually done within a minute)."
