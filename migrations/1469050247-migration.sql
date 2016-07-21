-- Migration July 20, 2016

-- Add Email Message Table
CREATE TABLE IF NOT EXISTS email_messages (
  id bigserial PRIMARY KEY,
  transmission_id varchar(255) NOT NULL,
  playbook_id varchar(255) NOT NULL,
  user_id varchar(255) NOT NULL,
  company_id varchar(255) NOT NULL,
  scheduled boolean DEFAULT false,
  sent boolean DEFAULT false,
  canceled boolean DEFAULT false,
  sent_at int,
  scheduled_for int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add scheduled status to playbook status'
ALTER TYPE status ADD VALUE 'scheduled' BEFORE 'sent';
