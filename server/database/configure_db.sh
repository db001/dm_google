#!/bin/bash

source ./config/config.sh
export PGPASSWORD=$PGPASSWORD

echo "Configuring db"

dropdb -U postgres dmgoogle
createdb -U postgres dmgoogle

psql -U postgres dmgoogle < ./database/database.sql

echo "db configured"