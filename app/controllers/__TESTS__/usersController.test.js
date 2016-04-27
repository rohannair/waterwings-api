// Deps
const app = require('./../../index.js');
const request = require('supertest')(app.listen());
const test = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

// Import User Model
const User = require('./../../models/User.js');

// Setup function used to create objects for test.
const setup = () => {
  return {};
  // Ensure that fresh objects are created each time that tests are run
  const fixtures = {};
  return fixtures;
};

const teardown = () => {
  return {};
  // Dispose of fixtures here
};

// Do anything before the tests here
test('Set Up tests', (t) => {
  User.query().where({username: "tester@workmail.com"}).del();
  t.end()
});

// Test #1 Make a GET request to the users controller
test('usersController GET request', (t) => {
  request
    .get('/api/v1/users')
    .query()
    .expect(200)
    .end((err, res) => {
      if(err || res.length < 0) {
        t.fail('GET request test failed');
      } else {
        t.pass('Get request test passed');
      }
    });
  t.end();
});


// Test #2: Make a POST request to the users controller
test('usersController POST request', (t) => {
  request
    .post('/api/v1/users')
    .send(
      {
        "username": "tester@workmail.com",
        "password": "password",
        "is_admin": false,
        "first_name": "Master",
        "last_name": "Tester",
        "personal_email": "tester@testmail.com",
        "company_id": "3",
        "role_id": 5
      }
    )
    .expect(201)
    .end((err, resp) => {
      if(err) {
        t.fail('POST request test Failed');
      } else {
        t.pass('POST request test Passed');
      }
    });
    t.end();
});

// Test #3: Make a PUT request to the users controller
test('usersController PUT request', (t) => {
  request
    .put('/api/v1/users/1')
    .send(
      {
        "first_name": "John"
      }
    )
    .expect(201)
    .end((err, resp) => {
      if(err) {
        t.fail('PUT request to test Failed');
      } else {
        t.pass('PUT request to test Passed');
      }
    });
    t.end();
});

// Test #4: Make a DELETE request to the users controller
test('usersController DELETE request', (t) => {
  request
    .delete('/api/v1/users/1')
    .expect(401)
    .expect('Not allowed to DELETE User')
    .end((err, resp) => {
      if(err) {
        t.fail('DELETE request test Failed');
      } else {
          t.pass('DELETE request test Passed');
      }
    });
    t.end();
});

// Test #5: Make a PUT_RESULT request to the users controller
test('usersController PUT_RESULT request', (t) => {
  // request
  //   .post('/api/v1//submitSurvey')
  //   .expect(200)
  //   .end((err, resp) => {
  //     if(err) {
  //       t.fail('PUT_RESULT request test Failed');
  //     } else {
  //       t.pass('PUT_RESULT request test passed');
  //     }
  //   )};
  t.end();
});

// Do anything after the tests here
test('Clean up tests', (t) => {
  User.query().where({username: "tester@workmail.com"}).del();
  t.end()
});
