-- Migration - Thu 26 May 2016

-- Add assigned column to playbooks table
ALTER TABLE playbooks ADD COLUMN assigned varchar(50) REFERENCES users;

-- Add collaborators column to playbooks table, will be an array of user_id's
ALTER TABLE playbooks ADD COLUMN collaborators text[];

-- Add status type to database
CREATE TYPE status AS ENUM ('draft', 'complete');

-- Add current_status column to playbooks table
ALTER TABLE playbooks ADD COLUMN current_status status;
