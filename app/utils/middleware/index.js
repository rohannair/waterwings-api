// Dependencies
const ApiError = require('./../customErrors');
const token = require('./../token');

// Middleware for router to check authorization of user
function* adminCheck(next) {
  if (!this.state.user.isAdmin) throw new ApiError('Access Denied', 403, 'Non-Admin user attempted to access protected routes');
  yield* next;
}

// Middleware to verify JWT's
function* tokenCheck(next) {
  if(this.token) {
    this.state.user = yield token.verifyToken(this.token)
    yield* next;
  } else {
    throw new ApiError('Not Authorized', 400, 'User does not have a token');
  }
}

module.exports = {
  adminCheck: adminCheck,
  tokenCheck: tokenCheck
}
