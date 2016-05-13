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
