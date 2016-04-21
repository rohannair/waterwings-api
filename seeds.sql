-- Command to seed the database
-- psql -f seeds.sql q_test;


INSERT INTO companies (name, address_1, province, country, postal_code) VALUES
  ('QRTRMSTR', '1 Yonge Street', 'ON', 'CA', 'M4A1Z0'),
  ('The Avengers', '123 Danger Street', 'CA', 'US', 'M5V3Y4');

INSERT INTO departments(company_id, name) VALUES
  (1, 'Executive'),
  (1, 'Marketing'),
  (1, 'Development'),
  (2, 'Executive'),
  (2, 'Marketing'),
  (2, 'Development');

INSERT INTO users (first_name, last_name, email, work_email, is_admin, company_id, department_id) VALUES
  ('Rohan', 'Nair', 'r@rohannair.ca', 'r@workmail.ca', true, 1, 1),
  ('Ron', 'Swanson', 'rs@parks.rec', 'rs@workmail.rec', false, 1, 2),
  ('Lesley', 'Knope', 'lk@parks.rec', 'lk@workmail.rec', false, 1, 3),
  ('Bruce', 'Wayne', 'bruce@batmail.com', 'bruce@workmail.com', false, 2, 4),
  ('Clark', 'Kent', 'clark@supermail.com', 'clark@workmail.com', false, 2, 5),
  ('Tony', 'Stark', 'tony@ironmail.com', 'tony@workmail.com', false, 2, 6);


INSERT INTO playbooks (name, description, data, company_id) VALUES
  ('Generic Playbook','Generic Onboarding Playbook', '{ "name": "Generic Playbook", "data": { "title": "Welcome to the Company", "Stuff": "skdjfhaksjdfhkasljfhd" } }', 1),
  ('Other Playbook','Another Playbook', '{ "name": "Second Playbook", "data": { "title": "Another Playbook", "Stuff": "Here is some more information" } }', 2);
