const redis = require('redis');
const bluebird = require('bluebird');

// Promisfy all redis requests
// It'll add a Async to all node_redis functions (e.g. return client.getAsync().then())
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Retry Strategy
function retry_strategy(options) {
  if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with a individual error
      return new Error('The server refused the connection');
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with a individual error
      return new Error('Retry time exhausted');
  }
  if (options.times_connected > 10) {
      // End reconnecting with built in error
      return undefined;
  }
  // reconnect after
  return Math.max(options.attempt * 100, 3000);
}

module.exports = () => redis.createClient({ url: process.env.REDIS_URL, retry_strategy});
