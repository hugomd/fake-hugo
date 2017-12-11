// Strips tweets of mentions
const hashtag = /(#\w*\s)/gim;
const mention = /(@\w*\s)/gim;
const retweet = /RT\s*(@\w*(\s|:))/gim;
const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

module.exports = text => {
  return text
    .replace(hashtag, '')
    .replace(mention, '')
    .replace(retweet, '')
    .replace(url, '')
    .trim();
};
