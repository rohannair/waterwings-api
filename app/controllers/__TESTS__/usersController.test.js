// Users controller tests
const test = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const app = require('../../index.js');
const User = require('../../models/Users');
const usersController  = require('../usersController');

// Setup function used to create objects for test.
const setup = () => {
  // Ensure that fresh objects are created each time that tests are run
  const fixtures = {
    user: {

    },
    request: {

    }
  };
  return fixtures;
};

const teardown = (fixtures) => {
  // Dispose of fixtures here
};

test('before', (t) => {
  // Do anything before the tests here
  t.pass('Start of the tests!');
  t.end();
});

// Test #1a: Make a GET request to the users controller
test('usersController GET request', (t) => {
  // Here i need to call setup to create the users functions and mock request
  // var this = setup()
  // t.equal(usersController.GET,)
  // t.pass(usersController.GET, 'yo');
  t.end();
});


// We send in some params to /users and then the user with all those params are
// returned
// I need to see what params are collected and then create an entered user with those params
// This request will then return a request with the actual users
// I may need to create a user in the database to simulate the controller actually looking
// for and then returning the correct users
// I could also just stub the

// Test #2: Make a POST request to the users controller

// Test #3: Make a PUT request to the users controller

// Test #4: Make a DELETE request to the users controller

test('usersController DELETE request', (t) => {
  var response = usersController.DELETE;

  console.log(response);
    // t.equal(this.status, 401);
    // t.equal(this.body, 'Not allowed to DELETE User')
});

// Test #5: Make a PUT_RESULT request to the users controller

test('after', (t) => {
  // Do anything after the tests here
  t.pass('End of Tests!');
  t.end();
});
