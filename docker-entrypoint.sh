#!/usr/bin/env bash

# Django only serves static files if running in debug mode (i.e. in development)
# https://docs.djangoproject.com/en/3.2/howto/static-files/
# In production, the static files are meant to be served by dedicated server like nginx

set -Eeuo pipefail

echo "------------------------------------------------";
if [[ ! -z "$1" && ( "$1" == "dev" || "$1" == "debug" ) ]]; then
  echo "Running in DEV mode...";
  echo "Static/media files are served via Django dev server.";
  echo "Make sure /app/media is mounted with dedicated location to hold user uploads.";
  echo "------------------------------------------------";
  export DEBUG_MODE=true;
  exec python manage.py runserver 0.0.0.0:80;
else
  echo "Running in PRODUCTION mode...";
  echo "Static (pre-collected) and media files should be served at /static and /media via dedicated server.";
  echo "Make sure /app/media is mounted with dedicated location to hold user uploads.";
  echo "------------------------------------------------";
  export DEBUG_MODE=false;
  exec gunicorn -w 3 -b 0.0.0.0:80 meetm.wsgi;
fi
