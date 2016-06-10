-- Seed file for database

INSERT INTO companies(id, name, address, subdomain, database_host) VALUES
  ('nGLHsVI', 'Pied Piper', '{"street_address": [28, "Ted Rogers", "Way", ""], "city": "Toronto", "province_or_state": "ON", "postal_code": "M4Y2J4", "country": "CA"}', NULL, 'localhost');

INSERT INTO roles(name, company_id) VALUES
  ('CEO', 'nGLHsVI'),
  ('CTO', 'nGLHsVI'),
  ('Software Engineer', 'nGLHsVI'),
  ('Business Manager', 'nGLHsVI');

INSERT INTO playbooks (id, name, description, company_id, doc) VALUES
  ('4958cfba-d713-4919-9a80-c124079cf52a', 'Pied Piper Software Engineer', 'Pied Piper playbook for new software engineer', 'nGLHsVI',
  '{
    "0": {
      "slide_number": 0,
      "submittable": false,
      "type": "intro",
      "heading": "Hi, Welcome to Pied Piper!",
      "body": "<p>We are firm believers in empowering our team from day 0, so have created an online onboarding and training program to help you hit the ground running on day 1.</p><p>Here is the agenda:</p><ol><li>Fill out your user profile</li><li>Choose your equipment</li><li>Knowledge center</li><li>See the schedule for your first day</li></ol><p>If you have any questions about this process, you can contact the <a href=\"mailto:onboarding@piedpiper.com\">Onboarding Team</a>, or your manager <a href=\"mailto:jared@pipedpiper.com\">Jared Dunn</a>.</p>"
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
    "2":{
       "body":"<p><p><strong>Slack</strong></p>\n<p>You have been sent an invitation to join the Pied Piper channel. &nbsp;Use this to quickly communicate with your fellow coworkers.</p></p>",
       "type":"intro",
       "heading":"Your Toolkit",
       "submittable": false,
       "slide_number":2
    },
    "3": {
      "slide_number": 3,
      "submittable": true,
      "type": "equipment",
      "heading": "Choose your equipment",
      "body": {
        "desc": "<p>We want to make sure that you have all the tools you need to work at your best. If something you want is not on this list, let us know.</p>",
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
    "4": {
      "slide_number": 4,
      "submittable": false,
      "type": "knowledgectr",
      "heading": "Knowledge Center",
      "body": {
        "desc": "<p>We have got a lot of learning content to get you ready for your role. We recommend that you go through the following lesssons before your first day, to hit the ground running:</p>",
        "options": [
          {
            "id": "guo8if4Yxhw",
            "name": "Data Compression as Fast As Possible",
            "type": "youtube"
          },
          {
            "id": "jSdjJM4b860",
            "name": "What is Scala | Overview of Scala Programming",
            "type": "youtube"
          },
          {
            "id": "69V__a49xtw",
            "name": "Silicon Valley Season 1: Trailer (HBO)",
            "type": "youtube"
          }
        ]
      }
    },
    "5": {
      "body": {
        "agenda": [
           {
            "startTime": 1464094800000,
            "finishTime": 1464096600000,
            "desc": "Meet Jared Dunn at 3rd floor"
           },
           {
            "startTime": 1464096600000,
            "finishTime": 1464098400000,
            "desc": "Meet and greet with engineering team"
           },
           {
            "startTime": 1464098400000,
            "finishTime": 1464102000000,
            "desc": "Stand-up meeting with Mobile Application team"
           },
           {
            "startTime": 1464102000000,
            "finishTime": 1464105600000,
            "desc": "One-on-One with Gilfoyle - Lead Dev Ops Engineer"
           },
           {
            "startTime": 1464105600000,
            "finishTime": 1464107400000,
            "desc": "Lunch with team"
           },
           {
            "startTime": 1464109200000,
            "finishTime": 1464111000000,
            "desc": "Mix and Mingle"
           },
           {
            "startTime": 1464118200000,
            "finishTime": 1464123600000,
            "desc": "Planning meeting with Dinesh - Lead Software Development Engineer"
           },
           {
            "startTime": 1464125400000,
            "finishTime": 1464130800000,
            "desc": "(optional) Social with team @ The Cantina"
           }
         ]
      },
      "type": "day1agenda",
      "submittable": false,
      "position": { "lat":37.4219999, "lng": -122.0840575 },
      "place": {
        "name": "Pied Piper Headquaters",
        "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, United States"
      },
      "heading":"Your first day",
      "contact": {
        "title":"Business Manager",
        "name":"Jared Dunn",
        "email":"jared@piedpiper.com"
      },
      "couponInput": {
        "show": true,
        "code": "welcome2piedpiper"
      },
      "detailed_location": null,
      "date": "2016-06-01",
      "slide_number": 5
    }
  }'
);

INSERT INTO users (id, username, password, is_admin, first_name, last_name, personal_email, company_id, role_id, profile_img) VALUES

  ('a4bd224f-9aa6-4f15-b3c9-cb7551cd797f', 'richard@pied.piper', crypt('password', gen_salt('bf')), true, 'Richard', 'Hendricks', 'richard@example.com', 'nGLHsVI', 1, null),
  ('a24b4195-4a49-450b-9b30-81632ef4c245', 'erlich@pied.piper', crypt('password', gen_salt('bf')), false, 'Erlich', 'Bachman', 'erlich@example.com', 'nGLHsVI', 2, null),
  ('2bd3d5b7-e013-40af-b236-770844e55124', 'gilfoyle@pied.piper', crypt('password', gen_salt('bf')), false, 'Bertram', 'Gilfoyle', 'gilfoyle@example.com', 'nGLHsVI', 3, null),
  ('376e0300-22d4-4d66-ad31-caf91882964d', 'dinesh@pied.piper', crypt('password', gen_salt('bf')), false, 'Dinesh', 'Chugtai', 'dinesh@example.com', 'nGLHsVI', 3, null),
  ('4f0eefc6-dbee-4974-bacb-9f02c112718e', 'jared@pied.piper', crypt('password', gen_salt('bf')), true, 'Jared', 'Dunn', 'jared@example.', 'nGLHsVI', 4, null);
