-- Seed file for database

INSERT INTO companies(id, name, address) VALUES
  (1, 'QRTRMSTR', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "CA"}'),
  (2, 'Scotia Bank', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "CA"}'),
  (3, 'The Justice League', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "USA"}'),
  (4, 'The Avengers', '{"street_address": [1, "Yonge", "Street", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V3Y4", "country": "USA"}');

INSERT INTO roles(name, company_id) VALUES
  ('Executive', 1),
  ('Marketer', 1),
  ('Developer', 1),
  ('Superhero', 3),
  ('Superhero', 4);

INSERT INTO surveys (id, name, description, company_id, doc) VALUES
  (gen_random_uuid(), 'Generic Playbook','Generic Onboarding Playbook', 1, '{ "body": "Generic Playbook", "data": { "title": "Welcome to the Company", "Stuff": "Here is some more information" } }'),
  (gen_random_uuid(), 'ScotiaBank UX Survey', 'Scotia Bank UX survey for new hire', 2,
  '{
    "0": {
      "slide_number": 0,
      "type": "intro",
      "heading": "Hi ${user}, welcome to Scotiabank!",
      "body": "<p>We are firm believers in empowering our team from day 0, so have created an online onboarding and training program to help you hit the ground running on day 1.</p><p>Here is the agenda:</p><ol><li>Fill out your user profile</li><li>Choose your equipment</li><li>Knowledge center</li><li>See the schedule for your first day</li></ol><p>If you have any questions about this process, you can contact the <a href=\"mailto:onboarding@scotiabank.com\">Onboarding Team</a>, or your manager <a href=\"mailto:billjobs@scotiabank.com\">Bill Jobs</a>.</p>"
    },
    "1": {
      "slide_number": 1,
      "type": "bio"
    },
    "2": {
      "slide_number": 2,
      "type": "equipment",
      "heading": "Choose your equipment",
      "body": {
        "desc": "We want to make sure that you have all the tools you need to work at your best. If something you want is not on this list, let us know.",
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
              "2x Dell Utrasharp 24\"",
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
      }
    },
    "3": {
      "slide_number": 3,
      "type": "knowledgectr",
      "heading": "Knowledge Center",
      "body": {
        "desc": "We have got a lot of learning content to get you ready for your role. We recommend that you go through the following lesssons before your first day, to hit the ground running:",
        "options": [
          {
            "id": "gqOEoUR5RHg",
            "name": "Bootstrap Primer"
          },
          {
            "id": "qAws7eXItMk",
            "name": "Running User Interviews"
          },
          {
            "id": "SqfhZk0eIdE",
            "name": "Object Oriented CSS (OOCSS)"
          }
        ]
      }
    },
    "4": {
      "slide_number": 4,
      "type": "day1agenda",
      "heading": "Your first day - February 29th, 2016",
      "body": {
        "map": "<div><iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.943199942455!2d-79.38169928447599!3d43.64935007912145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d28cfad4bf%3A0x5f2a34991d2bacb5!2sScotia+Plaza!5e0!3m2!1sen!2sca!4v1455674281242\" frameborder=\"0\" allowfullscreen></iframe><div><span class=\"fa fa-building\"></span> 40 King St W, Toronto, ON M5H 3Y2 <a href=\"#\">Get Directions</a></div><div><span class=\"fa fa-user\"></span> Office Manager - <a href=\"#\">John Smith</a></div><div><span class=\"fa fa-envelope\"></span><a href=\"#\">J.Smith@scotiabank.com</a></div><div><div class=\"uber-promo\"> Complimentary UBER Code <strong>Welcome2ScotiaBank</strong></div></div></div>",
        "agenda": [
          {
            "time": "9:00am",
            "desc": "Meet Bill Jobs at 11th floor"
          },
          {
            "time": "9:30am",
            "desc": "Meet and greet with UX team"
          },
          {
            "time": "10:00am",
            "desc": "Stand-up meeting with Mobile Application team"
          },
          {
            "time": "11:00am",
            "desc": "One-on-One with Bill Jobs"
          },
          {
            "time": "12:00pm",
            "desc": "Lunch with Bill Jobs and UX team"
          },
          {
            "time": "1:30pm",
            "desc": "Mix and Mingle"
          },
          {
            "time": "4:00pm",
            "desc": "Planning meeting with Mobile Application team"
          },
          {
            "time": "5:00pm",
            "desc": "(optional) Social with team @ The Duke of Richmond"
          }
        ]
      }
    }
  }'
);

INSERT INTO users (id, username, password, is_admin, first_name, last_name, personal_email, company_id, role_id) VALUES
  (gen_random_uuid(), 'usersname1@email.com', 'password', true, 'Rohan', 'Nair', 'r@rohannair.ca', 1, 1),
  (gen_random_uuid(), 'usersname2@email.com', 'password', false, 'Ron', 'Swanson', 'rs@parks.rec', 1, 2),
  (gen_random_uuid(), 'usersname3@email.com', 'password', false, 'Lesley', 'Knope', 'lk@parks.rec', 1, 3),
  (gen_random_uuid(), 'usersname4@email.com', 'password', false, 'Bruce', 'Wayne', 'bruce@batmail.com', 3, 4),
  (gen_random_uuid(), 'usersname5@email.com', 'password', false, 'Clark', 'Kent', 'clark@supermail.com', 3, 4),
  (gen_random_uuid(), 'usersname6@email.com', 'password', false, 'Tony', 'Stark', 'tony@ironmail.com', 4, 5);
