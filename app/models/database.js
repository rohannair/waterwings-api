import pg from 'pg';
import Sequelize from 'sequelize';

// Import model factories
import Users from './Users.js';
import Companies from './Companies.js';
import Products from './Products.js';
import ProductTypes from './ProductTypes.js';
import Packages from './Packages.js';

// Set up database
const sequelize   = new Sequelize('waterwings', 'root', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

// Set models
const User        = Users(sequelize);
const Company     = Companies(sequelize);
const Product     = Products(sequelize);
const ProductType = ProductTypes(sequelize);
const Package     = Packages(sequelize);

// Sync models with Postgres
Package.sync({force: true})
  .then(Company.sync({force:true}))
  .then(Product.sync({force:true}))
  .then(ProductType.sync({force:true}))
  .then(User.sync({force:true}));
