// Deps
const app = require('./../../index.js');
const request = require('supertest')(app.listen());
const test = require('tape');

// Test #1 Make a GET request to the surveys controller
test('surveysController GET request', (t) => {
  request
    .get('/api/v1/surveys')
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

// Test #2: Make a POST request to the surveys controller
test('surveysController POST request', (t) => {

  request
    .post('/api/v1/surveys')
    .send(
      {
        "name": "Test Survey",
        "description": "Test Survey blah blah blah",
        "company_id": "1",
        "doc": { "body": "Generic Playbook", "data": { "title": "Welcome to the Company", "Stuff": "Here is some more information" } }
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

// Test #3: Make a PUT request to the surveys controller
test('surveysController PUT request', (t) => {
  request
    .put('/api/v1/surveys/1')
    .send(
      {
        "name": "Other Test Survey"
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

// Test #4: Make a DELETE request to the surveys controller
test('surveysController DELETE request', (t) => {
  request
    .delete('/api/v1/surveys/1')
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
