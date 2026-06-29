#!/bin/sh
# PostgreSQL backup — run via: docker compose -f docker-compose.prod.yml --profile backup run --rm backup
set -eu

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
FILE="${BACKUP_DIR}/credora_${TIMESTAMP}.sql.gz"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"

mkdir -p "$BACKUP_DIR"

echo "Starting backup to ${FILE}..."
pg_dump -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" | gzip > "$FILE"
echo "Backup complete: $(du -h "$FILE" | cut -f1)"

# Prune old backups
find "$BACKUP_DIR" -name "credora_*.sql.gz" -mtime +"$RETENTION_DAYS" -delete 2>/dev/null || true
echo "Pruned backups older than ${RETENTION_DAYS} days"
