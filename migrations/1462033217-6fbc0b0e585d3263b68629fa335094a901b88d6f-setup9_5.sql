-- Main File to set schema of database

-- Add pgcrypto extension
CREATE EXTENSION pgcrypto;

-- companies Table
CREATE TABLE IF NOT EXISTS companies (
  id varchar(50) PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL,
  address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- roles table
CREATE TABLE IF NOT EXISTS roles (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL,
  company_id varchar(50) REFERENCES companies ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- surveys table
CREATE TABLE IF NOT EXISTS surveys (
  id varchar(50) PRIMARY KEY,
  name varchar(100) NOT NULL,
  description varchar(255),
  company_id varchar(50) REFERENCES companies,
  doc jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX ON surveys USING GIN (doc);

-- users table
CREATE TABLE IF NOT EXISTS users (
  id varchar(50) PRIMARY KEY,
  username varchar(100) UNIQUE NOT NULL,
  password varchar(100) NOT NULL,
  is_admin boolean,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  personal_email varchar(50) UNIQUE NOT NULL,
  profile_img varchar(255),
  bio text,
  social_media jsonb,
  company_id varchar(50) REFERENCES companies ON DELETE CASCADE,
  role_id integer REFERENCES roles,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- completed_surveys table
CREATE TABLE IF NOT EXISTS completed_surveys (
  id varchar(50) PRIMARY KEY,
  survey_id varchar(50) REFERENCES surveys,
  user_id varchar(50) REFERENCES users,
  company_id varchar(50) REFERENCES companies,
  results jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX ON completed_surveys USING GIN (results);
