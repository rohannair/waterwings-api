// Deps
const ApiError = require('../utils/customErrors');

const playbookJoinsController = () => {

  return {
    POST: function* () {
      if ((!this.request.body.userId) || (!this.request.body.playbookId)) {
        this.status = 400;
        this.body = {
          message: 'Please enter both valid userId and playbookId'
        }
        return;
      }

      const result = yield this.models.PlaybookJoin.query().post({
        user_id: this.request.body.userId,
        playbook_id: this.request.body.playbookId
      });

      this.status = 201;
      this.body = result;
    }
  }
}

module.exports = playbookJoinsController;
