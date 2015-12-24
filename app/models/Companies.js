import Sequelize from 'sequelize';

const Companies = function(sequelize) {
  const Company = sequelize.define('Company', {

    name: {
      type: Sequelize.STRING,
    },

    address1: {
      type: Sequelize.STRING
    },

    address2: {
      type: Sequelize.STRING
    },

    city: {
      type: Sequelize.STRING
    },

    province: {
      type: Sequelize.ENUM(
        'AB',
        'BC',
        'NB',
        'MB',
        'NL',
        'NS',
        'NT',
        'NU',
        'ON',
        'PE',
        'QC',
        'SK',
        'YT'
      )
    },

    country: {
      type: Sequelize.ENUM('CA')
    },

    phoneNumber: {
      type: Sequelize.BIGINT
    },

  });

  return Company;
};

export default Companies;
