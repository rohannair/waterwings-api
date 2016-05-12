import { getUserByQuery } from './../models/User';

module.exports = function* (userId) {
    const user = yield getUserByQuery(userId);
    if (user.length === 0) throw 'User not found'
    return (user[0].is_admin === true);
}
