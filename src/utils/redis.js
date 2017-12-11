const redis = require('promise-redis')();
const env = require('../env');

module.exports = () => {
  const client = redis.createClient(env.REDIS_URL);

  client.on('ready', () => {
    console.log('> Redis ready');
  });

  client.on('error', err => {
    console.log('> Redis error', err);
  });

  return client;
};
