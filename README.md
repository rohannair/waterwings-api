# Quartermaster API

## Development Rules

### Dependency Management
The dependencies in this repo have been shrinkwrapped. From now own when doing any development you need to follow the steps below
1. Pull a new branch from dev
2. `npm install` to get all current dependencies (from `npm.shrinkwrap.json`)


Now during development if you wish to add any new modules or dependencies you can do so with
```bash
$ npm install --save 'package-name'
```
This will add the new package to the `package.json` file and the `node_modules` folder and it will be used throughout your future work on this branch.

Be careful as running `npm install` at anytime will always grab the dependencies listed in the `npm.shrinkwrap.json` instead of the `package.json` file and rewrite the `node_modules` folder

Once your development is finished and you wish to create a pull request you must first run
```bash
$ npm shrinkwrap --dev
```

This will take any new dependencies added during you development and rewrite the `npm.shrinkwrap.json` file to include them.

Now you are able to push the new branch up for a pull request

# Running the Application

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
Only necessary if you require mock data in the database

To insert an example company into the database
```bash
$ npm run seed:company
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

## Token Information
The API now requires tokens in order to return data
The only open endpoints without a valid token are
```bash
/api/v1/login
```
In order to generate a token you must first hit the login endpoint with a post request that contains the following information
```JSON
{
  "username": "user@workmail.com",
  "password": "password123"
}
```

If the username and password are correct the API will return a token the can then be placed in the header of all future requests
The expiry date on each token is currently a couple of days

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

## Error Management
There is a central function that deals with all error reporting for the API.
This function will return a status code and an error message back to the user whenever an error has occurred.

In order to use the central error function throughout the API at an endpoint all you need to do it
throw an error at anytime using the following code

```javascript
throw new ApiError('Message for user to see', 404, 'Message to be placed in logs')
```

This will throw an error in API and it will be caught by the upstream error reporting function and returned back to the user.

Only return simple error messages to the user make sure that important systems information is not revealed

## Testing
To run each test first move into the testing directory
```bash
$ cd app/controllers/__TESTS__/
```

Now you will be able to run each test with
```bash
$ babel-node usersController.test.js
```

Here usersController.test.js is an example but each test can be run in this way.

After a test has been run you need to use `ctrl-c` to end the test and then run the next one.


## Email Sender
API to wrap requests to SparkPost and send emails out to users

The API will accept a POST request
to the following URI

```
http://localhost:3000/api/v1/playbook/send
```

It will then send a personalized email out to the user with a link on the
bottom directing the user to the specific playbook

Currently only the following email templates are available
* welcomeEmail

## Build & Deploy:
1. Get Heroku toolbelt (`$ brew install heroku-toolbelt`)
2. Make sure you have Heroku credentials for API repo
3. `$ heroku login`
4. `$ heroku git:remote -a waterwings`
4. From master: `$ git push heroku master`
5. From other branches `$ git push heroku <branch>:master -f`

If master push fails on a conflict, use the `-f`.

## Registering a new Customer

In order to register a new customer the following api endpoint must be hit with a POST request
```
api/v1/register
```
The format of the POST request is
```javascript
{
  "company": {
    "companyName": "Evil Corp",
    "address": {
        "city": "Toronto",
        "country": "CAN",
        "postal_code": "M5V3Y4",
        "street_address": ["46", "Spadina", "Av"],
        "province_or_state": "ON"
    },
    "subdomain": "evilcorp"
  },
  "user": {
    "username": "stosh@qrtrmstr.com",
    "password": "password",
    "first_name": "Stosh",
    "last_name": "Fabricius"
  }
}
```

This endpoint does not require a token or any Authorization.

This endpoint will add the company to the database, add the subdomain to cloudflare, and add a Domain name to heroku.
