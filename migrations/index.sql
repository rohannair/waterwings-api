-- Migrations file to run all migrations in order at once

BEGIN;
-- Inital Migaration
\i ./migrations/1462033217-6fbc0b0e585d3263b68629fa335094a901b88d6f-setup9_5.sql
-- Next Migration to switch Surveys to Playbooks
\i ./migrations/04052016-migration.sql
COMMIT;
