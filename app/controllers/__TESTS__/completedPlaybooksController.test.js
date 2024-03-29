// Deps
const app = require('./../../index.js');
const request = require('supertest')(app.listen());
const test = require('tape');

// Test #1 Make a GET request to the completedPlaybooks controller
test('completedPlaybooksController GET request', (t) => {
  request
    .get('/api/v1/completedPlaybooks')
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

// Test #2: Make a POST request to the completedPlaybooks controller
test('completedPlaybooksController POST request', (t) => {

  request
    .post('/api/v1/completedPlaybooks')
    .send(
      {
        "results": { "name": "Generic Results", "data": { "Stuff": "Here is some more results info" } }
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

// Test #3: Make a PUT request to the completedPlaybooks controller
test('completedPlaybooksController PUT request', (t) => {
  request
    .put('/api/v1/completedPlaybooks/1')
    .send(
      {
        "name": "Other Test Results"
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

// Test #4: Make a DELETE request to the completedPlaybooks controller
test('completedPlaybooksController DELETE request', (t) => {
  request
    .delete('/api/v1/completedPlaybooks/1')
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
