// Require Ava - Test runner
const test = require('ava');

// Load in config variables
if( process.env.NODE_ENV === 'test' ) {

  // these should be in our circle ci setup
  process.env.JWT_SECRET='shared'
  process.env.LOG_LOCATION='app/logs/waterwings-api.log'
  process.env.ADD_CUSTOMER_SECRET='qrtrmstr2016'
  process.env.SPARK_POST_API_KEY='38b9327ea4d8693fb5ba039ccd76beb91cc89de8'
  process.env.DOMAIN='localhost:8080'
  process.env.AWS_ACCESS_KEY_ID='AKIAJQWJMGHU7Q2SLDHA'
  process.env.AWS_SECRET_ACCESS_KEY='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'
  process.env.AWS_BUCKET='qrtrmstr-images'
  process.env.DB_HOST='localhost'
  process.env.DB_USER='root'
  process.env.DB_PASSWORD='password'
  process.env.DB_NAME='quartermasterdb'
  process.env.REDIS_URL='redis://127.0.0.1:6379'
  process.env.RATE_LIMIT_MAX='200'
  process.env.RATE_LIMIT_DURATION='3600000'
  process.env.CLOUD_FLARE_API_KEY='e7d07146f76c0ac6f8523d9978e2ff36ac59d'
  process.env.CLOUD_FLARE_EMAIL='rohan@qrtrmstr.com'
  process.env.DOMAIN_NAME='qrtrmrstr-ui.herokuapp.com'
  process.env.ZONE_IDENTIFIER='68b4335f43968b4aaa5b86ffbe883581'
  process.env.HEROKU_APP_NAME='qrtrmstr-ui'
  process.env.HEROKU_API_KEY='64a46032-2139-4b7b-8fbf-718124127cd0'
  process.env.GOOGLE_CLIENT_ID='307433377129-lsr453mrelii3bn86sev1s758l7f6c89.apps.googleusercontent.com'
  process.env.GOOGLE_CLIENT_SECRET='WSg7ZVmRnLFe0gc8LPf4b4j5'
  process.env.GOOGLE_AUTH_CALLBACK_URL='http://localhost:3000/v1/callback/auth/google'
  process.env.GOOGLE_API_SCOPE='https://www.googleapis.com/auth/calendar'
  process.env.SLACK_CLIENT_ID=''
  process.env.SLACK_CLIENT_SECRET=''
  process.env.SLACK_SCOPE='users%3Aread+channels%3Awrite+channels%3Aread+incoming-webhook+commands+bot'
  process.env.SLACK_REDIRECT_URI='http://localhost:8080/integration/slack'
  process.env.LINKEDIN_CLIENT_ID='77jlw4c67o9cca'
  process.env.LINKEDIN_REDIRECT_URI='http://localhost:3000/v1/callback/auth/linkedIn'
  process.env.LINKEDIN_CLIENT_SECRET='DdY7CIlByReZdNIP'
  process.env.SLACK_WEBHOOK='https://hooks.slack.com/services/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'
  process.env.SLACK_TEST_USER_TOKEN='xoxp-22280619940-31391246176-56700747925-c3478db1c1'
}

// Load Api in supertest
const app = require('./index.js');
const request = require('supertest')(app.listen());

// I should actually login and then get and save a token

// Incorrect token
// let token = '1234xyz';


// I should also just generate a real token to start
// TODO: find a way to gen a real token 
const token = ''



// Test Welcome Endpoint
test.cb('API Welcome Message', t => {

  t.plan(1);

  request
    .get('/v1')
    .set('Accept', 'application/json')
    .expect({message: 'Welcome to the Quartermaster API'})
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .end((err, res) => {
      if (err) t.fail();
      t.pass();
      t.end();
    });

});



// Test to login in as a user with an incorrect token



// Test to login as a user with a correct token


// I should chain these tests here






// Test Playbook Controller public routes controller
// test.cb('API Welcome Message', t => {
//
//   t.plan(1);
//
//
// .get('GET a public playbook', playbooksController.PUBLIC_GET_ONE)
//
//   request
//     .get('/get_playbook/:id')
//     .expect(200)
//     .end((err, res) => {
//       if (err) t.fail();
//       t.pass();
//       t.end();
//     });
//
// });

// Example Post request
// var user = {name: 'Bob'};
// request
//     .post('/create-user')
//     .send(user)
//     .expect({success:true}, done);
