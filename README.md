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
```bash
$ npm start
```

## Token Information
The API now requires tokens in order to return data.
The only open endpoint without a valid token is
```bash
/api/v1/login
```
In order to generate a token you must first hit the above endpoint with
a post request with the following information
```JSON
{
  "username": "user@workmail.com",
  "password": "password123"
}
```

If the username and password are correct the API will return a token the can then be placed in the header of all future requests

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

This information can be accessed in any endpoint in the API by calling
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
