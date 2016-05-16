Current Steps to add a new company to the database

1. First we need to configure a subdomain for the company with our hosting provider
  - Create an A record for the new company
  - Format will be all one word and all small case
  - example Scotia Bank would be http://scotiabank.qrtrmstr.com
2. We need to add the company as a User in the postgres server and create their schema
  - The username and schema in the database will be the same as the serialized subdomain name
  - Example Scotia Bank would have the following information in the database server
  ```
    username: scotiabank
    password: password
  ```
  - The above can be accomplished by running the following as the database super user (root user in out case)
  ```SQL
    CREATE USER scotiabank PASSWORD 'password';
    CREATE SCHEMA AUTHORIZATION scotiabank;
    REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM scotiabank;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA scotiabank TO scotiabank;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA scotiabank TO root;
    ALTER USER scotiabank SET search_path = scotiabank;
    CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA scotiabank;
  ```
3. Now to fill in the database schema we need to run the migrations and seeds file while logged in as the new company. This command is
  ```bash
    psql -h localhost -p 5432 -d quartermasterdb -U scotiabank -f index.sql
    psql -h localhost -p 5432 -d quartermasterdb -U scotiabank -f seeds.sql
  ```
  If we run it from the command line
  OR
  if we are logged into the database server as the new company user
  ```bash
  scotiabank=> \i index.sql
  scotiabank=> \i seeds.sql
  ```

4. The Company now has a functional database and the application will be able to access their information

5. Now we need to add an admin user manually in to the companies's database
  - We can use the following statement to manually add the admin user
  ```SQL
    INSERT INTO users (id, username, password, is_admin, first_name, last_name, personal_email, company_id, role_id) VALUES (gen_random_uuid(), 'usersname1@email.com', crypt('password', gen_salt('bf')), true, 'Rohan', 'Nair', 'r@rohannair.ca', 'nGLHsVI', 1);
  ```
6. The company now has a role in the database and they also have an admin user that can add new user's and add more data to the database
  - This is bare minimum amount required to have a functioning database for a company
  - At this point we can pre fill the database with any amount of data that the company requests
