module.exports = (playbook) =>
  (new Promise((resolve, reject) => {

    let newSubmittedDoc = {};

    for (let val in playbook.doc) {

      let slide = playbook.doc[val];
      if(slide.submittable === true) {

        switch (slide.type) {
          case 'bio':
            let newBioOptions = {};

            for (let val in slide.body.options) {
              if (slide.body.options[val] === true) {
                newBioOptions[val] = '';
              }
            }

            newSubmittedDoc[val] = {
              type: slide.type,
              submitted: false,
              slide_number: slide.slide_number,
              body: {
                heading: "Profile",
                options: newBioOptions
              }
            }
            break;

          case 'equipment':
            let newEquipOptions = slide.body.options.map((val, index) =>  Object.assign(val, { opts: ''}, { optNames: ''}) );
            newSubmittedDoc[val] = {
              type: slide.type,
              submitted: false,
              slide_number: slide.slide_number,
              heading: "Tools",
              body: {
                options: newEquipOptions
              }
            }
            break;
        }

      }

    }

    resolve(newSubmittedDoc);
  }));
