-- Migration - Mon 16 May 2016

-- Add subdomain column to the companies table
ALTER TABLE companies ADD COLUMN subdomain text;

-- Add database_host column (location of database) to the companies table
ALTER TABLE companies ADD COLUMN database_host text;
