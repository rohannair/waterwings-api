-- Migration - Wed 1 Jun 2016

-- Add column to playbooks table for submitted playbook
ALTER TABLE playbooks ADD COLUMN submitted_doc jsonb;

-- Extend status type
ALTER TYPE status ADD VALUE 'sent' AFTER 'draft';
ALTER TYPE status ADD VALUE 'in progress' AFTER 'sent';

-- Add column to playbooks table for percentage of playbook completed
ALTER TABLE playbooks ADD COLUMN percent_submitted text;

-- Add default of draft for current_status column in playbooks table
ALTER TABLE playbooks ALTER COLUMN current_status SET DEFAULT 'draft';
