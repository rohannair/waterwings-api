import Sequelize from 'sequelize';

const Products = function(sequelize) {
  const Product = sequelize.define('Product', {

    name: {
      type: Sequelize.STRING,
    },

    manufacturer: {
      type: Sequelize.STRING,
    },

    type: {
      type: Sequelize.STRING,
    },

    vendor: {
      type: Sequelize.STRING,
    },

    SKU: {
      type: Sequelize.STRING,
    },

    MPN: {
      type: Sequelize.STRING,
    },

    UPC: {
      type: Sequelize.STRING,
    },

    type: {
      type: Sequelize.STRING,

      reference: {
        model: 'ProductTypes',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }

  });

  return Product;
};

export default Products;
