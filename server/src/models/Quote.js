const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    qotd: {
        type: Boolean
    },
    lastDateWasQotd: {
        type: String
    },
    type: {
        type: String
    },
    charity: {
        type: Object
    }
}, {
    timestamps: true
})

const Quote = mongoose.model("Quote", quoteSchema)

module.exports = Quote