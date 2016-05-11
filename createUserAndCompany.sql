
-- Commands to run this file as the root user and add a new user (new company) to the database
-- psql -h localhost -p 5432 -d quartermasterdb -U root -f createUserandCompany.sql

CREATE USER scotiabank PASSWORD 'password';
CREATE SCHEMA AUTHORIZATION scotiabank;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM scotiabank;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA scotiabank TO scotiabank;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA scotiabank TO stoshfabricius;
ALTER USER scotiabank SET search_path = scotiabank;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA scotiabank;
