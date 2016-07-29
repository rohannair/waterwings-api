// Deps
const ApiError = require('../utils/customErrors');

const playbookJoinsController = () => {

  return {
    POST: function* () {
      const { userId, playbookId } = this.request.body;

      if ((!userId) || (!playbookId)) {
        throw new ApiError('Please enter both valid userId and playbookId', 400, 'Invalid/Missing userID or playbookId ');
      }

      const result = yield this.models.PlaybookJoin.query().post({
        user_id: userId,
        playbook_id: playbookId
      });

      this.status = 201;
      this.body = result;
    }
  }
}

module.exports = playbookJoinsController;
