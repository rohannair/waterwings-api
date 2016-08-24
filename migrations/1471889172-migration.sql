-- -- Migration August 22, 2016

-- Add start date to users table
ALTER TABLE users ADD COLUMN start_date BIGINT;
