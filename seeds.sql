-- Seed file for database

INSERT INTO companies(id, name, address) VALUES
  (1, 'QRTRMSTR', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "CA"}'),
  (2, 'The Justice League', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "USA"}'),
  (3, 'The Avengers', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "USA"}');

INSERT INTO role_names(name) VALUES
  ('Executive'),
  ('Marketer'),
  ('Developer'),
  ('Superhero');

INSERT INTO roles(role_name_id, company_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (4, 3);

INSERT INTO surveys (id, name, description, company_id, doc) VALUES
  (gen_random_uuid(), 'Generic Playbook','Generic Onboarding Playbook', 1, '{ "body": "Generic Playbook", "data": { "title": "Welcome to the Company", "Stuff": "skdjfhaksjdfhkasljfhd" } }'),
  (gen_random_uuid(), 'Other Playbook','Another Playbook', 2, '{ "body": "Second Playbook", "data": { "title": "Another Playbook", "Stuff": "Here is some more information" } }'),
  (gen_random_uuid(), 'Otherer Playbook','Anotherer Playbook', 3, '{ "body": "A Playbook", "data": { "title": "Anotherer Playbook", "Stuff": "Here is some more information" } }');

INSERT INTO users (id, username, password, is_admin, first_name, last_name, personal_email, company_id, role_id) VALUES
  (gen_random_uuid(), 'usersname1@email.com', 'password', true, 'Rohan', 'Nair', 'r@rohannair.ca', 1, 1),
  (gen_random_uuid(), 'usersname2@email.com', 'password', false, 'Ron', 'Swanson', 'rs@parks.rec', 1, 2),
  (gen_random_uuid(), 'usersname3@email.com', 'password', false, 'Lesley', 'Knope', 'lk@parks.rec', 1, 3),
  (gen_random_uuid(), 'usersname4@email.com', 'password', false, 'Bruce', 'Wayne', 'bruce@batmail.com', 2, 4),
  (gen_random_uuid(), 'usersname5@email.com', 'password', false, 'Clark', 'Kent', 'clark@supermail.com', 2, 4),
  (gen_random_uuid(), 'usersname6@email.com', 'password', false, 'Tony', 'Stark', 'tony@ironmail.com', 3, 5);
