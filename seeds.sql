-- Seed file for database

INSERT INTO companies(id, name, address, subdomain, database_host) VALUES
  ('nGLHsVI', 'Quartermaster', '{"street_address": [28, "Ted Rogers", "Way", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M4Y2J4", "country": "CA"}','qrtrmstr', 'localhost'),
  ('OeUMkxw', 'Lighthouse Labs', '{"street_address": [46, "Spadina", "Street", "Suite", 400], "city": "Toronto", "province_or_state": "ON", "postal_code": "M5V 2H8", "country": "CA"}','lighthouselabs', 'localhost');

INSERT INTO roles(name, company_id) VALUES
  ('Executive', 'nGLHsVI'),
  ('Marketer', 'nGLHsVI'),
  ('Developer', 'nGLHsVI'),
  ('Mentor', 'OeUMkxw'),
  ('Staff', 'OeUMkxw');

INSERT INTO playbooks (id, name, description, company_id, doc) VALUES
  ('4958cfba-d713-4919-9a80-c124079cf52a', 'ScotiaBank UX Playbook', 'Scotia Bank UX playbook for new hire', 'nGLHsVI',
  '{
    "0": {
      "slide_number": 0,
      "submittable": false,
      "type": "intro",
      "heading": "Hi ${user}, welcome to Scotiabank!",
      "body": "<p>We are firm believers in empowering our team from day 0, so have created an online onboarding and training program to help you hit the ground running on day 1.</p><p>Here is the agenda:</p><ol><li>Fill out your user profile</li><li>Choose your equipment</li><li>Knowledge center</li><li>See the schedule for your first day</li></ol><p>If you have any questions about this process, you can contact the <a href=\"mailto:onboarding@scotiabank.com\">Onboarding Team</a>, or your manager <a href=\"mailto:billjobs@scotiabank.com\">Bill Jobs</a>.</p>"
    },
    "1": {
      "slide_number": 1,
      "submittable": true,
      "type": "bio",
      "body": {
        "heading": "Fill out your Employee profile",
        "options": {
          "name": true,
          "bio": true,
          "profile_image": true,
          "linkedin": true,
          "twitter": true,
          "facebook": false
        }
      }
    },
    "2": {
      "slide_number": 2,
      "submittable": true,
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
      "submittable": false,
      "type": "knowledgectr",
      "heading": "Knowledge Center",
      "body": {
        "desc": "We have got a lot of learning content to get you ready for your role. We recommend that you go through the following lesssons before your first day, to hit the ground running:",
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
      }
    },
    "4": {
      "body": {
        "desc": "<div><span class=\"fa fa-building\"></span> 40 King St W, Toronto, ON M5H 3Y2 <a href=\"#\">Get Directions</a></div><div><span class=\"fa fa-user\"></span> Office Manager - <a href=\"#\">John Smith</a></div><div><span class=\"fa fa-envelope\"></span><a href=\"#\">J.Smith@scotiabank.com</a></div><div><div class=\"uber-promo\"> Complimentary UBER Code <strong>Welcome2ScotiaBank</strong></div></div></div>",
        "agenda": [
           {
            "startTime": 1464094800000,
            "finishTime": 1464094800000,
            "desc": "Meet Bill Jobs at 11th floor"
           },
           {
            "startTime": 1464096600000,
            "finishTime": 1464096600000,
            "desc": "Meet and greet with UX team"
           },
           {
            "startTime": 1464098400000,
            "finishTime": 1464098400000,
            "desc": "Stand-up meeting with Mobile Application team"
           },
           {
            "startTime": 1464102000000,
            "finishTime": 1464102000000,
            "desc": "One-on-One with Bill Jobs"
           },
           {
            "startTime": 1464105600000,
            "finishTime": 1464105600000,
            "desc": "Lunch with Bill Jobs and UX team"
           },
           {
            "startTime": 1464107400000,
            "finishTime": 1464107400000,
            "desc": "Mix and Mingle"
           },
           {
            "startTime": 1464118200000,
            "finishTime": 1464107400000,
            "desc": "Planning meeting with Mobile Application team"
           },
           {
            "startTime": 1464125400000,
            "finishTime": 1464125400000,
            "desc": "(optional) Social with team @ The Duke of Richmond"
           }
         ]
      },
      "type": "day1agenda",
      "submittable": false,
      "position": { "lat":43.6446447, "lng": -79.39499869999997 },
      "place": {
        "name": "Lighthouse Labs",
        "formatted_address": "46 Spadina Avenue, Toronto, ON, Canada"
      },
      "heading":"Your first day",
      "contact": {
        "title":"",
        "name":"",
        "email":""
      },
      "couponInput": {
        "show":false,
        "code":""
      },
      "detailed_location": null,
      "date": "2016-05-24",
      "slide_number": 4
    }
  }'
), ('72ade965-ccc3-406b-b4d9-b3e233e6bf58', 'Lighthouse Toronto Mentor', 'Toronto Mentor', 'OeUMkxw',
  '{
    "0":{
       "body":"<p>Welcome to Lighthouse Labs - We are really excited to have your contribution helping us teach and grow the next generation of developer talent!.As part of your on-boarding, there are a few things to do done:</p>\n<ol>\n  <li>Fill out your user profile &amp; upload docs</li>\n  <li>Access team groups</li>\n  <li>Knowledge Center</li>\n  <li>See the schedule for your first day</li>\n</ol>\n<p>If you have any questions feel free to contact <a href=\"mailto:kate@lighthouselabs.ca\">kate@lighthouselabs.ca</a></p>",
       "type":"intro",
       "heading":"Hey JerKhurram, welcome aboard!",
       "submittable": false,
       "slide_number":0
    },
    "1":{
       "body":{
          "heading":"Fill out your Employee profile",
          "options":{
             "bio":true,
             "name":true,
             "twitter":false,
             "facebook":false,
             "linkedin":false,
             "profile_image":true
          }
       },
       "type":"bio",
       "submittable": true,
       "slide_number":1
    },
    "2":{
       "body":"<p><a href=\"http://compass.lighthouselabs.ca/i/ykGpp112qqnbfk67hi5ro3wll\"><ins><strong>Compass Access</strong></ins></a></p>\n<p>Use the following URL to register and gain teacher access to the LMS, curriculum, students, etc. Please do not  will want to be checking what students are learning during lectures and in assignments prior to your shifts.</p>\n<p><strong>Email</strong></p>\n<p>You’ve been added to the web-teachers-toronto@lighthouselabs.ca email (google) group, which means you’ll be getting some emails from Compass (via instructors) and staff, and have access to our important gDocs.</p>\n<p><a href=\"https://docs.google.com/a/functionalimperative.com/spreadsheets/d/1BB4e_7Ih2lkmG9oD6vIhCgtPjq2rKiLOndPEcGMr8zE/edit\"><ins><strong>Schedule</strong></ins></a></p>\n<p>This is an important document, please bookmark it and check it weekly if not more regularly for changes.</p>\n<p>You’ve been added into the Teacher Info sheet, but please complete all your details in there at your earliest convenience. It will help us with scheduling going forward.</p>\n<p><strong>Slack</strong></p>\n<p>You have been sent an invitation to join the Toronto teacher channel. &nbsp;Use this to quickly communicate with your fellow LHL teachers and staff.</p>\n<p><strong>ClockTower</strong></p>\n<p>The on-boarding document explains what this is and why it is important to you. Your account has been created and you should have another email in your inbox with your credentials. Please send your invoices, as well as any concerns or questions re payment, to Landon at <a href=\"mailto:bookkeeper@lighthouselabs.ca\">bookkeeper@lighthouselabs.ca</a></p>",
       "type":"intro",
       "heading":"Your toolkit",
       "submittable": false,
       "slide_number":2
    },
    "3":{
       "body":{
          "desc":"We have got a lot of learning content to get you ready for your role. We recommend that you go through the following lesssons before your first day, to hit the ground running:",
          "options":[
             {
                "id":"nu4SERt8hyA",
                "type":"youtube",
                "name":"A Welcome from our Head Instructor Don!"
             },
             {
                "id":0,
                "type":"link",
                "name":"Lighthouse Labs Teacher Guide",
                "link":"https://docs.google.com/document/d/1K0vbFwOIAYzCyqfIYEQZWXsaeDpBKajq_E-3oIEnkYU/edit"
             }
          ]
       },
       "type":"knowledgectr",
       "heading":"Knowledge Center",
       "submittable": false,
       "slide_number":3
    },
    "4": {
      "body": {
        "desc": "<div><span class=\"fa fa-building\"></span> 40 King St W, Toronto, ON M5H 3Y2 <a href=\"#\">Get Directions</a></div><div><span class=\"fa fa-user\"></span> Office Manager - <a href=\"#\">John Smith</a></div><div><span class=\"fa fa-envelope\"></span><a href=\"#\">J.Smith@scotiabank.com</a></div><div><div class=\"uber-promo\"> Complimentary UBER Code <strong>Welcome2ScotiaBank</strong></div></div></div>",
        "agenda": [
           {
            "startTime": 1464094800000,
            "finishTime": 1464094800000,
            "desc": "Meet Bill Jobs at 11th floor"
           },
           {
            "startTime": 1464096600000,
            "finishTime": 1464096600000,
            "desc": "Meet and greet with UX team"
           },
           {
            "startTime": 1464098400000,
            "finishTime": 1464098400000,
            "desc": "Stand-up meeting with Mobile Application team"
           },
           {
            "startTime": 1464102000000,
            "finishTime": 1464102000000,
            "desc": "One-on-One with Bill Jobs"
           },
           {
            "startTime": 1464105600000,
            "finishTime": 1464105600000,
            "desc": "Lunch with Bill Jobs and UX team"
           },
           {
            "startTime": 1464107400000,
            "finishTime": 1464107400000,
            "desc": "Mix and Mingle"
           },
           {
            "startTime": 1464118200000,
            "finishTime": 1464107400000,
            "desc": "Planning meeting with Mobile Application team"
           },
           {
            "startTime": 1464125400000,
            "finishTime": 1464125400000,
            "desc": "(optional) Social with team @ The Duke of Richmond"
           }
         ]
      },
      "type": "day1agenda",
      "submittable": false,
      "position": { "lat":43.6446447, "lng": -79.39499869999997 },
      "place": {
        "name": "Lighthouse Labs",
        "formatted_address": "46 Spadina Avenue, Toronto, ON, Canada"
      },
      "contact": {
        "title":"",
        "name":"",
        "email":""
      },
      "couponInput": {
        "show":false,
        "code":""
      },
      "detailed_location": null,
      "heading":"Your first day",
      "date": "2016-05-24",
      "slide_number": 4
    }
  }'
);

INSERT INTO users (id, username, password, is_admin, first_name, last_name, personal_email, company_id, role_id, profile_img) VALUES

  ('a4bd224f-9aa6-4f15-b3c9-cb7551cd797f', 'rn@qrtrmstr.com', crypt('password', gen_salt('bf')), true, 'Rohan', 'Nair', 'r@rohannair.ca', 'nGLHsVI', 1, 'https://s3.amazonaws.com/qrtrmstr-images/kitten_face.png'),
  ('a24b4195-4a49-450b-9b30-81632ef4c245', 'usersname2@email.com', crypt('password', gen_salt('bf')), false, 'Ron', 'Swanson', 'rs@parks.rec', 'nGLHsVI', 2, null),
  ('2bd3d5b7-e013-40af-b236-770844e55124', 'usersname3@email.com', crypt('password', gen_salt('bf')), false, 'Lesley', 'Knope', 'lk@parks.rec', 'nGLHsVI', 3, null),
  ('376e0300-22d4-4d66-ad31-caf91882964d', 'kate@lighthouselabs.ca', crypt('kate123', gen_salt('bf')), true, 'Kate', 'Ciborowski', 'kate@lighthouselabs.ca', 'OeUMkxw', 5, 'https://s3.amazonaws.com/qrtrmstr-images/kitten_face.png'),
  ('4f0eefc6-dbee-4974-bacb-9f02c112718e', 'jeremy@lighthouselabs.ca', crypt('jeremy123', gen_salt('bf')), false, 'Jeremy', 'Shaki', 'jeremy@lighthouselabs.ca', 'OeUMkxw', 5, null);
