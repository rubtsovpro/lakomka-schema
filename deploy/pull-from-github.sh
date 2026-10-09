#!/bin/bash
# Cron / webhook: pull GitHub and deploy only schema.lakom-st.ru/
set -euo pipefail
MIRROR=/var/www/google/repos/lakomka-schema-mirror
WEBROOT=/var/www/schema.lakom-st.ru
KEY=/var/www/google/secrets/lakomka-schema-deploy-key
export GIT_SSH_COMMAND="ssh -i $KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
mkdir -p "$(dirname "$MIRROR")"
if [ ! -d "$MIRROR/.git" ]; then
  git clone --depth 1 git@github.com:rubtsovpro/lakomka-schema.git "$MIRROR"
fi
cd "$MIRROR"
BEFORE=$(git rev-parse HEAD)
git fetch --depth 1 origin main
git reset --hard origin/main
AFTER=$(git rev-parse HEAD)
if [ "$BEFORE" = "$AFTER" ] && [ -d "$WEBROOT/index.php" ]; then
  exit 0
fi
mkdir -p "$WEBROOT"
rsync -a --delete \
  --exclude 'data/*.json' \
  "$MIRROR/schema.lakom-st.ru/" "$WEBROOT/"
chown -R www-data:www-data "$WEBROOT" || true
echo "$(date -Iseconds) deployed $AFTER"
