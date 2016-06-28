CREATE TABLE IF NOT EXISTS emails (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  description varchar(255),
  body jsonb,
  role_id integer REFERENCES roles,
  company_id varchar(50) REFERENCES companies ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX emails_name ON emails (name);
