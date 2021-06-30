const express = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth')
const multer = require('multer')
// const sharp = require('sharp')
const { sendWelcome, sendGoodbye, sendNewPass } = require('../email/account')
const router = new express.Router();
const { setExpireTime } = require('../utils/SetExpire')
const expireTime = 365

//CREATE
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    let secure = ''
    if(process.env.NODE_ENV === 'production'){
        secure = 'secure'
    }
    try {
        const expires = setExpireTime(expireTime)
        const userIP = req.connection.remoteAddress
        const token = await user.generateAuthToken()
        await user.save();
        sendWelcome(user.email, user.name)
        res.setHeader('Set-Cookie', `AuthToken=${token};HttpOnly;expires=${expires};path=/;${secure};`)
        res.status(201).send({ user, token, userIP })

    } catch (error) {
        res.status(400).send(error)
    }

})

//LOGIN
router.post('/users/login', async (req, res) => {
    const userIP = req.connection.remoteAddress
    let secure = ''

    if(process.env.NODE_ENV === 'production'){
        secure = 'secure'
    }
    try {
        const expires = setExpireTime(expireTime)
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.setHeader('Set-Cookie', `AuthToken=${token};HttpOnly;expires=${expires};path=/;${secure};`)
        res.send({ user, userIP })
    } catch (err) {
        res.status(400).send({error: "Unable to login"})
    }
})

//LOGOUT
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

//LOGOUT ALL
router.post('/users/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.setHeader('Set-Cookie', `AuthToken='';HttpOnly;path=/;expires=`)
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

//READ profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


//UPDATE USER
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'name', 'email', 'password', 'age'
    ]
    const isValidUpdate = updates.every((item) => {
        return allowedUpdates.includes(item)
    })

    if(!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Update!" })
    }

    try {
        const user = await req.user
        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save()
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})
//UPDATE USER PASS BY EMAIL
router.patch('/users/forgot-pass', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res.status(404).send({error: "user not found"})
        }
        user.password = req.body.password
        await user.save()
        sendNewPass(req.body.email, user.name, req.body.password)
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})
//DELETE USER
router.delete('/users/me', auth, async (req, res) => {
    const user = req.user
    try {
        sendGoodbye(user.email, user.name)
        await req.user.remove()
        res.send(req.user)

    } catch (err) {

        res.status(500).send({error: "Internal Server Error"})
    }
})

//USER CAN UPLOAD PROFILE PICTURE
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|JPG)$/)){
            return cb(new Error("File must be PNG, JPG or JPEG"))
        }
        cb(undefined, true)
    }
})
// router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).png().resize(250, 250).toBuffer()
//     req.user.avatar = buffer
//     await req.user.save()
//     res.send()
    
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        res.status(404).send({error: error.message})
    }
})

module.exports = router;