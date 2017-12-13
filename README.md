# fake-hugo 🤖

The code for [@notrealhugo](https://twitter.com/notrealhugo).

Uses my ([@hugojmd](https://twitter.com/hugojmd)) tweets as input into Redis, creating a key-value relationship as follows with two words as the key and one word as the value.

For example, the sentence `The quick brown fox jumps over the lazy dog` gets ingested as:
```
The quick   -> brown
quick brown -> fox
brown fox   -> jumps
fox jumps   -> over
jumps over  -> the
over the    -> lazy
the lazy    -> dog
```

## Install
```javascript
npm i
```

## Usage
1. Set your environment variables:
    1. Twitter (create an app [here](https://apps.twitter.com/)):
        1. `CONSUMER_KEY`
        2. `CONSUMER_SECRET`
        3. `ACCESS_TOKEN`
        4. `ACCESS_TOKEN_SECRET`
    2. Redis: `REDIS_URL`
    3. The interval you want your bot to tweet at, `INTERVAL` (in minutes)
2. Download [your Twitter archive](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive).
3. Move it to `./tweets.csv`.
4. Run `npm start` will ingest your tweets into Redis, and start the bot. The first tweet is after `INTERVAL` minutes.

## To do
* [ ] Stream tweets from Twitter, via username, and ingest them into Redis.
* [ ] Weight the likelihood of a value being chosen by how frequently it is used.
