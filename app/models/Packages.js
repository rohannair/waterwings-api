import Sequelize from 'sequelize';

const Packages = function(sequelize) {
  const Package = sequelize.define('Package', {

    computerID: {
      type: Sequelize.INTEGER,
    },

    ramQuantity: {
      type: Sequelize.INTEGER,

      reference: {
        model: 'Products',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    mouseID: {
      type: Sequelize.INTEGER,

      reference: {
        model: 'Products',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    keyboardID: {
      type: Sequelize.INTEGER,

      reference: {
        model: 'Products',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    monitorID: {
      type: Sequelize.INTEGER,

      reference: {
        model: 'Products',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    monitorQuantity: {
      type: Sequelize.INTEGER,

      reference: {
        model: 'Products',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },

  });

  return Package;
};

export default Packages;
