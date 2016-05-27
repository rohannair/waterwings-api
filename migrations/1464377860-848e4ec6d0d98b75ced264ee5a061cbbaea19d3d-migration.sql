-- Migration - Fri 27 May 2016

-- Change personal email column in user's table to allow duplicate values
ALTER TABLE users DROP CONSTRAINT users_personal_email_key;

-- Change password column in user's table to allow null values
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

-- Change username column in user's table to allow null values
ALTER TABLE users ALTER COLUMN username DROP NOT NULL;
