// Deps
const app = require('./../../index.js');
const request = require('supertest')(app.listen());
const test = require('tape');
// const sinon = require('sinon');
// const proxyquire = require('proxyquire');

// Import User Model
const User = require('./../../models/Users.js');


// Setup function used to create objects for test.
// const setup = () => {
//   return {
//     createUser: () => {
//       Need to create a new User in the database to test against
//                 User
//                 .query()
//                 .insert(
//                   {
//                     "email": "jordan@golfmail.com",
//                     "first_name": "Jordan",
//                     "last_name": "Spieth",
//                     "isAdmin": false,
//                     "company_name": "UNDERARMOUR",
//                     "department_name": "Golfer"
//                   }
//                 ).then((user) => {
//                   return user;
//                 })
//                 .catch((err) => {
//                   return err;
//                 });
//     }
//   };
  // Ensure that fresh objects are created each time that tests are run
  // const fixtures = {
  //   createUser: () =>
  //
  // };
  // return fixtures;
// };

// const teardown = () => {
//   return {
//     deleteUser: (user) => {
//       User
//         .delete()
//         .then((user) => {
//
//         });
//     }
//   }
  // Dispose of fixtures here
  // Need to remove the user I added from the database
// };

// Do anything before the tests here
test('before', (t) => {

  t.end();
});

// Test #1 Make a GET request to the users controller
test('usersController GET request', (t) => {
  // console.log(setup().createUser());
  // console.log()
  request
    .get('/api/v1/users')
    .query({first_name: 'Rohan'})
    .expect(200)
    .expect(
      [
        {
          id: "1",
          email: "r@rohannair.ca",
          first_name: "Rohan",
          last_name: "Nair",
          isAdmin: true,
          company_name: "QRTRMSTR",
          department_name: "Executive"
        }
      ]
    )
    .end((err, res) => {
      if(err) {
        t.fail('GET request test failed');
      } else {
        t.pass('Get request test passed');
      }
    });
  t.end();
});


// Test #2: Make a POST request to the users controller
test('usersController POST request', (t) => {
  // request
  //   .post('/api/v1/users')
  //   .expect(200)
  //   .end((err, resp) => {
  //     if(err) {
  //       t.fail('POST request test Failed');
  //     } else {
  //       t.pass('POST request test Passed');
  //     }
  //   });
    t.end();
});

// Test #3: Make a PUT request to the users controller
test('usersController PUT request', (t) => {
  // request
  //   .put('/api/v1/users/1')
  //   .expect(200)
  //   .end((err, resp) => {
  //     if(err) {
  //       t.fail('PUT request to test Failed');
  //     } else {
  //       t.pass('PUT request to test Passed');
  //     }
  //   });
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
test('after', (t) => {

  t.end();
});
