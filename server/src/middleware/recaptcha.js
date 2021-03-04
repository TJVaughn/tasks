// const express = require('express')
// const router = new express.Router();

const checkRecaptcha = async (req, res, next) => {
    console.log("in checkrecaptcha")
    const data = {
        "secret": process.env.GRECAPTCHA_KEY,
        "response": res,
        "remoteip": req.connection.remoteAddress
    }
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const body = await response.json()
    console.log(body);
    if(!body.success){
        throw new Error("invalid captcha")
    }
    next()
}

module.exports = { checkRecaptcha }