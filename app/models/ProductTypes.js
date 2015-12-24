import Sequelize from 'sequelize';

const ProductTypes = function(sequelize) {
  const ProductType = sequelize.define('ProductType', {

    name: {
      type: Sequelize.STRING,
    },

    isSoftware: {
      type: Sequelize.BOOLEAN,
    },

  });

  return ProductType;
};

export default ProductTypes;
