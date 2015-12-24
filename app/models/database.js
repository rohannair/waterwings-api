import pg from 'pg';
import Sequelize from 'sequelize';

// Schema
import Users from './Users.js';
import Companies from './Companies.js';
import Products from './Products.js';
import ProductTypes from './ProductTypes.js';
import Packages from './Packages.js';

const sequelize   = new Sequelize('waterwings', 'root', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const User        = Users(sequelize);
const Company     = Companies(sequelize);
const Product     = Products(sequelize);
const ProductType = ProductTypes(sequelize);
const Package     = Packages(sequelize);

let dummyUser = {
  firstName  : 'Rohan',
  lastName   : 'Nair',
  email      : 'r@rohannair.ca',
  phoneNumber: '6479707998'
};

let dummyCompany = {
  name       : 'Quartermaster',
  address1   : '28 Ted Rogers Way',
  address2   : 'Apt 3404',
  city       : 'Toronto',
  province   : 'ON',
  country    : 'CA',
  phoneNumber: '6479707998'
};

Package.sync({force: true})
  .then(Company.sync({force:true}))
  .then(Product.sync({force:true}))
  .then(ProductType.sync({force:true}))
  .then(User.sync({force:true}))
  .then(() => User.create(dummyUser))
  .then(() => Company.create(dummyCompany));
