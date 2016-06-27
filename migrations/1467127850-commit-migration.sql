-- Migration - Tue 28 Jun 2016

-- Add google tokens to users table
ALTER TABLE users ADD COLUMN google_user_token text;
ALTER TABLE users ADD COLUMN google_refresh_token text;
