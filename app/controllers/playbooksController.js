// Deps
const ApiError = require('../utils/customErrors');
const { TEXT_SLIDE } = require('../constants/slides');

// Playbooks Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const playbooksController = () => {
  return {
    GET: function* () {
      this.body = yield this.models.Playbook.query().getAll(this.state.user.companyId, this.request.query.offset, this.request.query.limit);
      this.status = 200;
    },

    GET_ONE: function* () {
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);

      this.status = 200;
      this.body = {
        playbook: result[0]
      };
    },

    PUBLIC_GET_ONE: function* () {
      const result = yield this.models.Playbook.query().getPublishedPlaybookById(this.params.id);

      this.status = 200;
      this.body = {
        playbook: result[0]
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

      // Need to check for the bio card here
      // console.log(this.request.body.submitted_doc);
      // Need to check that the bio information is contained in the submitted card and then extract it and but it into the database


      // First step is to extract profile information from user's bio card
      const bioCardIndex =  Object.keys(this.request.body.submitted_doc).filter((val, ind) => this.request.body.submitted_doc[val].type === 'bio');
      if(bioCardIndex) {
        //  Extract data from bio card
        const bioCard = this.request.body.submitted_doc[bioCardIndex].body.options;
        //  Pull information out of card
        const { bio, profile_image } = bioCard;
        const playbook = yield this.models.Playbook.query().getPlaybookById(this.params.id);

        //  Update user's bio and profile image
        yield this.models.User.query().putUser({ bio, profile_img: profile_image }, playbook[0].assigned);
     }


      const numSubmittedSlides = Object.keys(this.request.body.submitted_doc).filter((val, ind) => this.request.body.submitted_doc[val].submitted === true ).length;
      const percent_submitted =  Math.round((numSubmittedSlides / Object.keys(this.request.body.submitted_doc).length) * 100) / 100;
      yield this.models.Playbook.query().submitPlaybook(Object.assign(this.request.body, { percent_submitted }), this.params.id);
      const result = yield this.models.Playbook.query().getPublishedPlaybookById(this.params.id);
      this.status = 200;
      this.body = {
        playbook: result[0],
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
    },

    INSERT_SLIDE: function* () {

      // Retrieve Current Playbook information
      const playbook = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      const num =  Object.keys(playbook[0].doc).length;

      // Create new playbook
      const newPlaybook = Object.assign(
        {},
        playbook[0].doc, {
          [num]: Object.assign(
            {},
            TEXT_SLIDE,
            { slide_number: num }
          )
        }
      );

      // Edit slide in db
      yield this.models.Playbook.query().putPlaybook({doc: newPlaybook}, this.params.id);

      // Retrieve updated slide
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      this.status = 200;
      this.body = {
        result: result[0],
        message: 'Successfully inserted a new slide.'
      };
    },

    CREATE_SLACK: function* () {
      // Recieve message from slack bot 
      const { userName, message } = this.request.body;
      console.log(`User name: ${userName}`);
      console.log(`Message: ${message}`); 

      // TODO: Need to determine where the message will be sent to

      // Send Message back to slack bot
      this.status = 200;
      this.body = {
        message: 'Recieved the info at the main api'
      }
    }

  };
}

module.exports = playbooksController;
