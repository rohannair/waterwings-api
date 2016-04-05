// Users controller tests
const test = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
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

// Test #1: Make a GET request to the users controller

// Test #2: Make a POST request to the users controller

// Test #3: Make a PUT request to the users controller

// Test #4: Make a DELETE request to the users controller

// Test #5: Make a PUT_RESULT request to the users controller

test('after', (t) => {
  // Do anything after the tests here
  t.pass('End of Tests!');
  t.end();
});
