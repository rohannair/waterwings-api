// Establish the connection to SparkPost
const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARK_POST_API_KEY);

module.exports = client;
