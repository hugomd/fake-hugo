const redis = require('./utils/redis')();

const MAX_LENGTH = 15;

const generate = async () => {
  // Get a starter
  const starter = await redis.srandmember('START');

  let key = starter;
  let sentence = [key];
  let len = 1;

  while (key && key !== null && sentence.length < MAX_LENGTH) {
    let value = await redis.srandmember(key);
    if (value.includes('END')) break;

    sentence.push(value);

    if (value) {
      key = key.split(' ')[1] + ' ' + value;
      len++;
      continue;
    }

    key = null;
  }

  sentence = sentence.join(' ');

  // TODO: Banned keywords list
  if (sentence.includes('#')) return generate();
  if (sentence.includes('@')) return generate();
  if (sentence.includes('RIFT')) return generate();
  if (sentence.includes('steam')) return generate();

  if (sentence.length > 280) return generate();
  if (sentence.length < 40) return generate();

  return sentence;
};

module.exports = generate;
