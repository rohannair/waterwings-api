alter table users add column department_id uuid;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

insert into companies (name, address_1, province, country, postal_code, created_at, updated_at)
  values ('QRTRMSTR', '1 Yonge Street', 'ON', 'CA', 'M4A1Z0', now(), now());

insert into departments(id, company_id, name, created_at, updated_at)
  values (uuid_generate_v4(), 1, 'Executive', now(), now()),
  (uuid_generate_v4(), 1, 'Marketing', now(), now()),
  (uuid_generate_v4(), 1, 'Development', now(), now());

insert into users (first_name, last_name, email, "isAdmin", created_at, updated_at, company_id, department_id) values
  ('Rohan', 'Nair', 'r@rohannair.ca', true, now(), now(), 1, 'cdf83fea-121e-4cc4-84cb-120eb97df010'),
  ('Ron', 'Swanson', 'rs@parks.rec', false, now(), now(), 1, '54b52012-1bf3-4afb-a6b3-eb92618c7dc6'),
  ('Lesley', 'Knope', 'lk@parks.rec', false, now(), now(), 1, '154d389d-db5f-449d-b9d5-fe8d9fa127cf');

alter table surveys rename column result to document;
alter table surveys add column name text;
alter table surveys drop column user_id;

update surveys set name='Generic onboard survey' where id='05e66b0f-af7b-40a7-b112-8a1d05a3a2ef';
