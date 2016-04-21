-- Main File to set schema of database

-- Need to create a database and then run theis file on the database
-- Command to run to set up the database
-- psql -f migrations.sql DATABASE-NAME;

-- companies Table
CREATE TABLE companies (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL,
  address_1 varchar(255),
  address_2 varchar(255),
  postal_code varchar(10),
  province char(2) DEFAULT 'CA',
  country char(2) DEFAULT 'ON',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- departments table
CREATE TABLE departments (
  id bigserial PRIMARY KEY,
  name varchar(100) NOT NULL,
  description varchar(100),
  company_id integer REFERENCES companies ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- surveys table
CREATE TABLE surveys (
  id bigserial PRIMARY KEY,
  name varchar(100),
  description varchar(255),
  company_id integer REFERENCES companies,
  doc jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX ON surveys USING GIN (data);

-- users table
CREATE TABLE users (
  id bigserial PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  password varchar(20),
  work_email varchar(50) UNIQUE NOT NULL,
  is_admin boolean,
  company_id integer REFERENCES companies ON DELETE CASCADE,
  department_id integer REFERENCES departments ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);


-- completed_surveys table
CREATE TABLE completed_surveys (
  id bigserial PRIMARY KEY,
  survey_id integer REFERENCES surveys,
  user_id integer REFERENCES users,
  company_id integer REFERENCES companies,
  doc jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX ON completed_surveys USING GIN (data);
