const Quote = require('../../models/Quote')
const sendDailyQuote = require('../../email/sendDailyQuote')
const postTweet = require('../../twitter/tweet')

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {

        let x = Math.floor(Math.random() * (i + 1))

        let t = array[i]
        array[i] = array[x]
        array[x] = t
    }
    // return array
}
const filterRecentQuotes = (quotes) => {
    let oneMonthAgo = (Date.now() - 2592000 * 1000)
    let newQuotes = []
    for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].lastDateWasQotd < oneMonthAgo || !quotes[i].lastDateWasQotd) {
            newQuotes.push(quotes[i])
        }
    }
    return newQuotes
}

module.exports = (agenda) => {
    agenda.define('pickQOTD', { priority: 20 }, async (job, done) => {
        try {
            let currQOTD = await Quote.findOne({ qotd: true })

            let quotes = await Quote.find({ qotd: false })
            quotes = filterRecentQuotes(quotes)
            currQOTD.qotd = false;
            await currQOTD.save()
            shuffle(quotes)
            let randNum = Math.floor(Math.random() * (quotes.length))
            let newQOTD = quotes[randNum]
            newQOTD.qotd = true
            newQOTD.lastDateWasQotd = Date.now()
            // console.log(new Date(newQOTD.lastDateWasQotd - 2592000 * 1000))
            await newQOTD.save()
            await sendDailyQuote(newQOTD)
            const tweet = `
                "${newQOTD.message}" -- ${newQOTD.source}.
                #quote #wisdom #${newQOTD.source}`
            postTweet(tweet)
            if (job.attrs.data) {
                if (job.attrs.data.oneOff) {
                    await job.remove()
                }
            }
            done()
        } catch (error) {
            throw new Error("Error in pick qotd: " + error)
        }

    })
    // agenda.every('5 seconds', 'pickQOTD')

}
