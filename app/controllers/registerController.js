// Deps
const ApiError = require('../utils/customErrors');
const encrypt = require('../utils/encryption');
const dns = require('../utils/dns');

// Register Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const registerController = () => {
  return {
    REGISTER: function* () {
      const { companyName, address, subdomain } = this.request.body.company;
      const { username, password, first_name, last_name } = this.request.body.user;
      const { roleName } = this.request.body.role;

      // Create a new DNS Record with Cloud Flare
      yield dns.createCloudFlareDomainRecord(subdomain);
      // Create a new Domain Record with Heroku
      yield dns.createHerokuDomainRecord(`${subdomain}.qrtrmstr.io`);

      // Insert Company into database
      const newCompany = yield this.models.Company.query().postCompany({name: companyName, address, subdomain, database_host: 'public' });
      // Insert Roles into Database
      const newRole = yield this.models.Role.query().postRole({name: roleName, company_id: newCompany.id});
      yield this.models.Role.query().postRole({name: 'Sales', company_id: newCompany.id});
      yield this.models.Role.query().postRole({name: 'Developer', company_id: newCompany.id});
      // Insert Admin User into Database
      const hash = yield encrypt.encryptPassword(password);
      const newAdminUser = yield this.models.User.query().postUser({username, password: hash, is_admin: true, first_name, last_name, company_id: newCompany.id, role_id: +newRole.id});
      // Insert new Playbook Template
      const newPlaybook = yield this.models.Playbook.query().postPlaybook({name: 'Template Playbook', description: 'Playbook for new hire', company_id: newCompany.id,
      doc:
          {
          "0": {
            "body": "<p>This is an onboarding template for you to customize.</p>\n<p>Use this card to welcome new hires with a personalized message explaining how excited you are that they are joining your team.</p>\n<p>This is also a great place to highlight tasks related to this playbook you would like new hires to complete before their first day.</p>\n<p>Example task list:</p>\n<ol>\n  <li>Fill out your user profile</li>\n  <li>Choose your equipment</li>\n  <li>Knowledge center for you to learn about our culture and processes</li>\n  <li>Check out the schedule for your first day</li>\n</ol>\n<p>You can also include web and mailto links in this card. If you have any questions you can contact our support team at <a href=\"mailto:support@qrtrmstr.com?Subject=Playbook%20Help\">support@qrtrmstr.com</a> [mailto:support@qrtrmstr.com]</p>",
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
              "desc": "<p>We want to make sure that you have all the tools you need to work at your best. Select from our tool catalogue and hit submit when you are happy.</p>",
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
              "lat": 43.7181557,
              "lng": -79.5181402
            },
            "place": {
              "name": "Toronto",
              "formatted_address": "Toronto, ON, Canada"
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
        }
      });
      this.status = 200;
      this.body = {
        result: [],
        message: 'You have created you new account'
      };
    }
  }
}

module.exports = registerController;
