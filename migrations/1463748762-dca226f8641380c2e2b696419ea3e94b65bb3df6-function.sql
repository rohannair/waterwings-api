-- Migration - Fri 20 May 2016

-- SQL Function to add a new customer into the database
CREATE FUNCTION add_customer (new_company_name text, new_address jsonb, new_subdomain text, new_role_name text, new_username text, new_password text, new_first_name text, new_last_name text, new_personal_email text) RETURNS void AS $$
DECLARE
  new_company_id text;
  new_role_id int;
BEGIN
-- Insert Company Information
INSERT INTO companies (id, name, address, subdomain, database_host) VALUES
  (gen_random_uuid(), new_company_name, new_address, new_subdomain, 'public');

SELECT companies.id INTO new_company_id FROM companies WHERE name = new_company_name;

-- Insert admin user's role
INSERT INTO roles(name, company_id) VALUES
  (new_role_name, new_company_id);

SELECT roles.id INTO new_role_id FROM roles WHERE company_id = new_company_id;

-- Insert admin user
INSERT INTO users (id, username, password, is_admin, first_name, last_name, personal_email, company_id, role_id) VALUES
  (gen_random_uuid(), new_username, crypt(new_password, gen_salt('bf')), true, new_first_name, new_last_name, new_personal_email, new_company_id, new_role_id);

-- Insert in default playbook
INSERT INTO playbooks (id, name, description, company_id, doc) VALUES
  (gen_random_uuid(), 'Playbook Template', 'Playbook Template', new_company_id,
    '{
    "0": {
      "body": "<p>This is an onboarding template for you to customize.</p>\n<p>Use this card to welcome new hires with a personalized message explaining how excited you are that they\'re joining your team.</p>\n<p>This is also a great place to highlight tasks related to this playbook you would like new hires to complete before their first day.</p>\n<p>Example task list:</p>\n<ol>\n  <li>Fill out your user profile</li>\n  <li>Choose your equipment</li>\n  <li>Knowledge center for you to learn about our culture and processes</li>\n  <li>Check out the schedule for your first day</li>\n</ol>\n<p>You can also include web and mailto links in this card. If you have any questions you can contact our support team at <a href=\"mailto:support@qrtrmstr.com?Subject=Playbook%20Help\">support@qrtrmstr.com</a> [mailto:support@qrtrmstr.com]</p>",
      "type": "intro",
      "heading": "Welcome :)",
      "submittable": false,
      "slide_number": 0
    },
    "1": {
      "body": {
        "heading": "Fill out your profile",
        "options": {
          "bio": true,
          "name": true,
          "twitter": true,
          "facebook": false,
          "linkedin": true,
          "profile_image": true
        }
      },
      "type": "bio",
      "submittable": true,
      "slide_number": 1
    },
    "2": {
      "body": {
        "desc": "<p>We want to make sure that you have all the tools you need to work at your best. Select from our tool catalogue and hit submit when you\'re happy.</p>",
        "options": [
          {
            "id": "laptop",
            "name": "Laptop",
            "opts": [
              "mbpr13",
              "mbpr15"
            ],
            "optNames": [
              "MacBook Pro Retina 13",
              "MacBook Pro Retina 15"
            ]
          },
          {
            "id": "monitors",
            "name": "Monitors",
            "opts": [
              "2usharp24",
              "cinemadisp"
            ],
            "optNames": [
              "2x Dell Utrasharp 24",
              "Apple Cinema Display"
            ]
          },
          {
            "id": "mouse",
            "name": "Mouse",
            "opts": [
              "magicmouse",
              "mxmaster"
            ],
            "optNames": [
              "Apple Magic Mouse",
              "Logitech MX Master"
            ]
          },
          {
            "id": "keyboard",
            "name": "Keyboard",
            "opts": [
              "applewired",
              "applewireless"
            ],
            "optNames": [
              "Apple Wired",
              "Apple Wireless"
            ]
          }
        ]
      },
      "type": "equipment",
      "heading": "Choose your equipment",
      "submittable": true,
      "slide_number": 2
    },
    "3": {
      "body": {
        "desc": "<p>We recommend that you go through the following lesssons before your first day, to hit the ground running:</p>",
        "options": [
          {
            "id": "gqOEoUR5RHg",
            "name": "Bootstrap Primer",
            "type": "youtube"
          },
          {
            "id": "qAws7eXItMk",
            "name": "Running User Interviews",
            "type": "youtube"
          },
          {
            "id": "SqfhZk0eIdE",
            "name": "Object Oriented CSS (OOCSS)",
            "type": "youtube"
          }
        ]
      },
      "type": "knowledgectr",
      "heading": "Knowledge Center",
      "submittable": false,
      "slide_number": 3
    },
    "4": {
      "body": {
        "agenda": [
          {
            "desc": "Meet Bill Jobs at 11th floor",
            "startTime": 1464094800000,
            "finishTime": 1464096600000
          },
          {
            "desc": "Meet and greet with UX team",
            "startTime": 1464096600000,
            "finishTime": 1464098400000
          },
          {
            "desc": "Stand-up meeting with Mobile Application team",
            "startTime": 1464098400000,
            "finishTime": 1464102000000
          },
          {
            "desc": "One-on-One with Bill Jobs",
            "startTime": 1464102000000,
            "finishTime": 1464105600000
          },
          {
            "desc": "Lunch with Bill Jobs and UX team",
            "startTime": 1464105600000,
            "finishTime": 1464107400000
          },
          {
            "desc": "Mix and Mingle",
            "startTime": 1464109200000,
            "finishTime": 1464111000000
          },
          {
            "desc": "Planning meeting with Mobile Application team",
            "startTime": 1464118200000,
            "finishTime": 1464123600000
          },
          {
            "desc": "(optional) Social with team @ The Duke of Richmond",
            "startTime": 1464125400000,
            "finishTime": 1464130800000
          }
        ]
      },
      "date": "2016-05-24",
      "type": "day1agenda",
      "position": {
        "lat": 43.6446447,
        "lng": -79.39499869999997
      },
      "place": {
        "name": "Lighthouse Labs",
        "formatted_address": "46 Spadina Avenue, Toronto, ON M5H 3Y2, ON, Canada"
      },
      "contact": {
        "title":"Office Manager",
        "name":"John Smith",
        "email":"J.Smith@email.com"
      },
      "couponInput": {
        "show": true,
        "code": "Welcome2PiedPiper"
      },
      "detailed_location": null,
      "heading":"Your first day",
      "submittable": false,
      "slide_number": 4
    }
  }'
);

END
$$ LANGUAGE plpgsql;
