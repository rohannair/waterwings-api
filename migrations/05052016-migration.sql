-- Migration - Wed 5 May 2016

-- Add deleted column to companies table
ALTER TABLE companies ADD deleted boolean DEFAULT false;

-- Add deleted column to users table
ALTER TABLE users ADD deleted boolean DEFAULT false;

-- Add deleted column to roles table
ALTER TABLE roles ADD deleted boolean DEFAULT false;

-- Add deleted column to playbooks table
ALTER TABLE playbooks ADD deleted boolean DEFAULT false;

-- Add deleted column to completed_playbooks table
ALTER TABLE completed_playbooks ADD deleted boolean DEFAULT false;
