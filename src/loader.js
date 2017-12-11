const fs = require('fs');
const csv = require('fast-csv');
const unescape = require('unescape');

const clean = require('./utils/stripper');
const redis = require('./utils/redis')();

const stream = fs.createReadStream("./tweets.csv");

const handleRedisErr = err => {
  if (err) {
    console.log('> Redis err: ', err);
  }
};

const load = text => {
  // strip word groups
  const arr = text.split(' ');
  const START = 'START';
  const END = 'END';
  for (let i = 0; i < arr.length; i++) {
    let key = arr.slice(i, i + 2).join(' ');
    let value = arr.slice(i + 2, i + 3).join(' ');

    // prepend start
    if (i === 0) {
      redis.sadd(START, key, handleRedisErr);
    }

    if (i === arr.length - 1) {
      value = END;
    }
    
    redis.sadd(key, value, handleRedisErr);
  }
};


csv
  .fromStream(stream, {headers: true})
  .on('data', data => {
    const stripped = unescape(clean(data.text));
    // If stripping fails, ignore it
    if (!stripped.includes('#') || !stripped.includes('@')) {
      // Load
      load(stripped);
    }
  })
  .on('end', () => {
    console.log('> Done loading tweets into Redis');
    process.exit(0);
  });
