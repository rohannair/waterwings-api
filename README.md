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
