-- Migration - Fri 13 May 2016

-- Change is_admin column in users table to default to false
ALTER TABLE users ALTER COLUMN is_admin SET DEFAULT false;
