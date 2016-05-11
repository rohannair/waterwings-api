# Quartermaster API

## Set-up
Install dependencies
```bash
$ npm install
```

## Migrate the database
```bash
$ npm run db:migrate
```

## Seed the database
Only necessary if you require fake data in the database
```bash
$ npm run db:seed
```

## Start application
In Dev mode
```bash
$ npm run dev
```

In Production Mode
```bash
$ npm start
```

## Subdomains
The API now requires a subdomain to be in the url in order to access the specific company's database
Therefore all requests must come from a url like this
```
http://companyname.localhost:3000/api/v1/whatever
```

What ever the subdomain is will grant you access to that company's database, given your request
is also accompanied by a valid token (keep reading for token info)

## Token Information
The API now requires tokens in order to return data
The only open endpoints without a valid token are
```bash
/api/v1/login|register|playbooks|submitPlaybook
```
In order to generate a token you must first hit the register or login endpoints with
a post request with the following information
```JSON
{
  "username": "user@workmail.com",
  "password": "password123"
}
```

The expiry date on each token is currently a couple of days

If the username and password are correct the API will return a token
that can then be placed in the header of all future requests

The format of the header data is
```
key: Authorization
value: Bearer theTokenGoesHere
```

## JSON Web Token
The JWT contains a payload with the following information about the user
```JSON
{
  "userID": "The user's id",
  "isAdmin": "true of false",
  "companyId": "The id of the users company"
}
```

The token payload information can be accessed in any endpoint in the API by calling
```javascript
this.state.user
```

## Testing
To run each test first move into the testing directory
```bash
cd app/controllers/__TESTS__/
```

Now you will be able to run each test with
```bash
babel-node usersController.test.js
```

Here usersController.test.js is an example but each test can be run in this way.

After a test has been run you need to use `ctrl-c` to end the test and then run the next one.
