/**
 * The following object can be used as the body in a playbook PUT
 */

{
 "name": "Generic Playbook",
 "description": "",
 "company_id": "", // THIS PART NEEDS TO BE FILLED IN?
  "doc": {
  "0": {
    "slide_number": 0,
    "type": "intro",
    "heading": "",
    "body": "<p></p>"
  },
  "1": {
    "slide_number": 1,
    "type": "bio",
    "body": {
      "heading": "Biography",
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
    "type": "equipment",
    "heading": "Choose your equipment",
    "body": {
      "desc": "",
      "options": [
        {
          "id": "laptop",
          "name": "Laptop",
          "opts": [
            "mbpr13"
          ],
          "optNames": [
            "MacBook Pro Retina 13"
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
      "desc": "Videos",
      "options": [
        {
          "id": "8HkVHbJZeWY",
          "name": "Getting started with ReactJS"
        },
      ]
    }
  },
  "4": {
    "slide_number": 4,
    "type": "day1agenda",
    "heading": "Your first day - February 29th, 2016",
    "body": {
      "map": "<p></p>",
      "agenda": [
        {
          "time": "9:00am",
          "desc": "Placeholder"
        }
      ]
    }
  }
}
}
