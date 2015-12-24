import Sequelize from 'sequelize';

const Users = function(sequelize) {
  const User = sequelize.define('User', {

    firstName: {
      type: Sequelize.STRING,
      field: 'first_name',
    },

    lastName: {
      type: Sequelize.STRING
    },

    email: {
      type: Sequelize.STRING
    },

    phoneNumber: {
      type: Sequelize.BIGINT
    },

    isAdmin: {
      type: Sequelize.BOOLEAN
    },

    companyID: {
      type: Sequelize.INTEGER,

      references: {
        model: 'Companies',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
      }
    },

    packageID: {
      type: Sequelize.INTEGER,

      references: {
        model: 'Packages',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
      }
    },

  });

  return User;
};

export default Users;
