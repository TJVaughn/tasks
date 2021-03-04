const twit = require('twit')
const config = require('./twitConfig')

const Twitter = new twit(config)

const postTweet = (tweet) => {
    Twitter.post('statuses/update', { status: tweet }, function (err, data, response) {
        // console.log(data)
    })
}
module.exports = postTweet