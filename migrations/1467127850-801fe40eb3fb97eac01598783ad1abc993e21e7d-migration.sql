-- Migration - Tue 28 Jun 2016

-- Add Google account info to users table
ALTER TABLE users ADD COLUMN google_user_id text;
ALTER TABLE users ADD COLUMN google_user_token text;
ALTER TABLE users ADD COLUMN google_refresh_token text;
ALTER TABLE users ADD COLUMN google_account_linked boolean DEFAULT false;

-- Add Slack account info to users table
ALTER TABLE users ADD COLUMN slack_user_token text;
ALTER TABLE users ADD COLUMN slack_account_linked boolean DEFAULT false;

-- Add LinkedIn account info to users table
ALTER TABLE users ADD COLUMN linkedIn_user_id text;
ALTER TABLE users ADD COLUMN linkedIn_user_token text;
ALTER TABLE users ADD COLUMN linkedIn_account_linked boolean DEFAULT false;
