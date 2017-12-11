const env = process.env;

exports.CONSUMER_KEY = env.CONSUMER_KEY;
exports.CONSUMER_SECRET = env.CONSUMER_SECRET;
exports.ACCESS_TOKEN = env.ACCESS_TOKEN;
exports.ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;

exports.INTERVAL = env.INTERVAL || 1; // Minutes

exports.REDIS_URL = env.REDIS_URL || 'redis://127.0.0.1:6379'
