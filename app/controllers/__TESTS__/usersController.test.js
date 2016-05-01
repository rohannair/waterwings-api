// Deps
const app = require('./../../index.js');
const request = require('supertest')(app.listen());
const test = require('tape');

// Test #1 Make a GET request to the users controller
test('usersController GET request', (t) => {
  request
    .get('/api/v1/users')
    .expect(200)
    .end((err, res) => {
      if(err || res.length < 0) {
        t.fail('GET test Failed');
      } else {
        t.pass('Get test Passed');
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
        t.fail('POST test Failed');
      } else {
        t.pass('POST test Passed');
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
    .expect(200)
    .end((err, resp) => {
      if(err) {
        t.fail('PUT test Failed');
      } else {
        t.pass('PUT test Passed');
      }
    });
    t.end();
});

// Test #4: Make a DELETE request to the users controller
test('usersController DELETE request', (t) => {
  request
    .delete('/api/v1/users/1')
    .expect(403)
    .end((err, resp) => {
      if(err) {
        t.fail('DELETE test Failed');
      } else {
          t.pass('DELETE test Passed');
      }
    });
    t.end();
});
