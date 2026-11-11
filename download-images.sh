#!/usr/bin/env bash
# Downloads every image listed in images/manifest.csv from the current site into images/.
# Run from the site folder:  bash download-images.sh
cd "$(dirname "$0")" || exit 1
fail=0
tail -n +2 images/manifest.csv | tr -d '\r' | while IFS=, read -r local url; do
  [ -s "$local" ] && continue
  mkdir -p "$(dirname "$local")"
  if curl -fsSL --retry 2 -o "$local" "$url"; then echo "ok   $local"; else echo "FAIL $url"; rm -f "$local"; fi
done
echo "Done. $(find images -type f ! -name manifest.csv | wc -l) of $(($(wc -l < images/manifest.csv)-1)) images present."
