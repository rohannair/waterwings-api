// Deps
const app = require('./../../index.js');
const request = require('supertest')(app.listen());
const test = require('tape');
// const sinon = require('sinon');
// const proxyquire = require('proxyquire');

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

// Do anything before the tests here
// test('before', (t) => {

//   t.end();
// });

// Test #1a: Make a GET request to the users controller
test('usersController GET request', (t) => {
  // request
  //   .get('/api/v1/users')
  //   .query({first_name: 'Rohan' })
  //   .expect(200)
  //   .expect({
  //     id: "1",
  //     email: "r@rohannair.ca",
  //     first_name: "Rohan",
  //     last_name: "Nair",
  //     isAdmin: true,
  //     company_name: "QRTRMSTR",
  //     department_name: "Executive"
  //     })
  //   .end((err, res) => {
  //     if(err) t.fail('GET request test failed');
  //     t.pass('Get request passed');
  //   });
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
  t.ok(request
    .delete('/api/v1/users/1')
    .expect(401)
    .expect('Not allowed to DELETE User')
    .end(), 'DELETE request passed');
    t.end();
});

// Test #5: Make a PUT_RESULT request to the users controller

// Do anything after the tests here
// test('after', (t) => {

//   t.end();
// });
