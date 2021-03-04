const request = require('request')
const express = require('express')
const router = new express.Router();


// router.post('/api/recaptcha', async (req, res) => {
//     const publicKey = req.body.publicKey
//     const secret = process.env.GRECAPTCHA_KEY
//     // console.log(publicKey)

//     request.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${publicKey}`,
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             // console.log(body);
//         }
//         // console.log(body)
//         res.send(body)
//     })
    
// })

module.exports = router