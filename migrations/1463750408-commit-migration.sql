-- Migration - Fri 20 May 2016

-- Change personal email column in user's table to not require a value
ALTER TABLE users ALTER COLUMN personal_email varchar(50) UNIQUE;
