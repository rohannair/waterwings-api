// Dependencies
const ApiError = require('./../customErrors');

// Middleware for router to check authorization of user
module.exports = function* (next) {
  if (this.state.user.isAdmin === false) throw new ApiError('Access Denied', 403, 'Non-Admin user attempted to access protected routes');
  yield* next;
}
