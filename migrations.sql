-- Main File to set schema of database

-- Need to create a database and then run theis file on the database
-- Command to run to set up the database
-- psql -f migrations.sql DATABASE-NAME;

-- CREATE DATABASE qtest;

-- Companies Table
CREATE TABLE companies (
  id serial PRIMARY KEY,
  name varchar(255),
  address_1 varchar(255),
  address_2 varchar(255),
  postal_code char(6),
  province char(2) DEFAULT 'CA',
  country char(2) DEFAULT 'ON',
  -- table.enum('province', ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK']).defaultTo('ON');
  -- table.enum('country', ['CA']).defaultTo('CA');
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE INDEX ON companies ( id );

-- Departments table
CREATE TABLE departments (
  id bigserial PRIMARY KEY,
  name varchar(100),
  description varchar(100),
  company_id integer REFERENCES companies ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE INDEX ON departments ( id );

-- Playbooks table
CREATE TABLE playbooks (
  id bigserial PRIMARY KEY,
  name varchar(100),
  description varchar(255),
  data jsonb,
  company_id integer REFERENCES companies,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE INDEX ON playbooks ( id );
CREATE INDEX ON playbooks USING GIN (data);

-- Users table
CREATE TABLE users (
  id bigserial PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  work_email varchar(50) UNIQUE NOT NULL,
  is_admin boolean,
  company_id integer REFERENCES companies ON DELETE CASCADE,
  department_id integer REFERENCES departments ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE INDEX ON users ( id );

-- Members table
CREATE TABLE members (
  id bigserial PRIMARY KEY,
  email varchar(50),
  password varchar(50),
  token varchar(255)
);

-- Completed_Playbooks table
CREATE TABLE completed_playbooks (
  id bigserial PRIMARY KEY,
  playbook_id integer REFERENCES playbooks,
  user_id integer REFERENCES users,
  data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE INDEX ON completed_playbooks ( id );
CREATE INDEX ON playbooks USING GIN (data);
