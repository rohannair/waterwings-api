-- Migration - Wed 4 May 2016

-- Rename surveys table to playbooks
ALTER TABLE surveys RENAME TO playbooks;

-- Rename completed_surveys table to completed_playbooks
ALTER TABLE completed_surveys RENAME TO completed_playbooks;

-- Add pgcrypto extension
CREATE EXTENSION pgcrypto;
