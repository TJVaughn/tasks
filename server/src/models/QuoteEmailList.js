const mongoose = require('mongoose')
const validator = require('validator')

const quoteEmailListSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Value must be a valid email address!")
            }
        }
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
})

const QuoteEmailList = mongoose.model("QuoteEmailList", quoteEmailListSchema)

module.exports = QuoteEmailList