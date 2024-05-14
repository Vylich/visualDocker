#!/bin/sh

now=$(date +"%d-%m-%Y_%H-%M")

DB_BASE=`/bin/su postgres -c "/usr/local/bin/psql -h db -qAt -c 'SELECT datname FROM pg_database;'" | \
     cut -d"|" -f1 | /bin/grep -v template | /bin/grep -v postgres`

echo $DB_BASE

for DB_NAME in $DB_BASE
  do
    /usr/local/bin/pg_dump -h db -U postgres ${DB_NAME} > "/backup/db_${DB_NAME}_$now.sql"
    /usr/local/bin/pg_dump -Fc -h db -U postgres ${DB_NAME} > "/backup/db_${DB_NAME}_$now.dump"
done

find /backup -name "*.sql" -type f -mtime +30 -delete
find /backup -name "*.dump" -type f -mtime +30 -delete

exit 0