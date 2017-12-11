const Twit = require('twit');
const generate = require('./generate');
const env = require('./env');

const T = new Twit({
  consumer_key:         env.CONSUMER_KEY,
  consumer_secret:      env.CONSUMER_SECRET,
  access_token:         env.ACCESS_TOKEN,
  access_token_secret:  env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

// TODO: Stream tweets and ingest them into Redis

const MINUTE = 60000; // Milliseconds
setInterval(async () => {
  console.log('> Making a new tweet...');
  const status = await generate();
  try {
    const t = await T.post('statuses/update', {status});
    console.log('> Posted: ', status);
  } catch (err) {
    console.log('> Failed to post to Twitter: ', err);
  }
}, env.INTERVAL * MINUTE);
