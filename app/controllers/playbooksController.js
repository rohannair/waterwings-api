// Deps
const ApiError = require('../utils/customErrors');

// Playbooks Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const playbooksController = () => {
  return {
    GET: function* () {
      this.body = yield this.models.Playbook.query().getAll(this.state.user.companyId);
      this.status = 200;
    },

    GET_ONE: function* () {
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      const {id, name, description, company_id, doc, assigned, submitted_doc, current_status, percent_submitted, userId, username, firstName, lastName, is_admin, rolename } = result[0];
      this.status = 200;
      this.body = {
        playbook: {id, name, description, company_id, doc, assigned, submitted_doc, current_status, percent_submitted},
        users: [{ userId, username, firstName, lastName, is_admin, rolename }]
      };
    },

    POST: function* () {
      const newPlaybook = yield this.models.Playbook.query().postPlaybook(Object.assign(this.request.body, {company_id: this.state.user.companyId}));
      const result = yield this.models.Playbook.query().getPlaybookById(newPlaybook);
      this.status = 201;
      this.body = {
        result: result[0],
        message: 'Playbook was added'
      };
    },

    PUT: function* () {
      let NoMatchMessage = null;
      const updated = yield this.models.Playbook.query().putPlaybook(this.request.body, this.params.id);
      if(updated.length <= 0) {
        NoMatchMessage = 'Can not update becuase this playbook has been sent';
      }
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      this.status = 200;
      this.body = {
        result: result[0],
        message: NoMatchMessage || 'Successfully updated playbook.'
      };
    },

    DELETE: function* () {
      const result = yield this.models.Playbook.query().putPlaybook({ deleted: true }, this.params.id);
      this.status = 201;
      this.body = {
        message: 'Playbook has been deleted'
      };
    },

    DUPLICATE: function* () {
      const playbookCopy = yield this.models.Playbook.query().duplicatePlaybook(this.request.body.id);
      const  result = yield this.models.Playbook.query().postPlaybook(playbookCopy);
      this.status = 201;
      this.body = {
        result,
        message: null
      };
    },

    SUBMIT: function* () {
      const numSubmittedSlides = Object.keys(this.request.body.submitted_doc).filter((val, ind) => this.request.body.submitted_doc[val].submitted === true ).length;
      const percent_submitted =  Math.round((numSubmittedSlides / Object.keys(this.request.body.submitted_doc).length) * 100) / 100;
      yield this.models.Playbook.query().submitPlaybook(Object.assign(this.request.body, { percent_submitted }), this.params.id);
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      this.status = 200;
      this.body = {
        result: result[0],
        message: 'Successfully submit.'
      };
    },

    STATUS_UPDATE: function* () {
      const updated = yield this.models.Playbook.query().submitPlaybook(this.request.body, this.params.id);
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      this.status = 200;
      this.body = {
        result: result[0],
        message: 'Successfully changed status.'
      };
    }

  };
}

module.exports = playbooksController;
