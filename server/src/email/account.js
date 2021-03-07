const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcome = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "Welcome to Check Off",
        text: `Welcome ${name}! 
        I hope this application helps you manage your projects, and even daily to-do's!
        I created this app because sometimes I'd have a lot of things floating around in my head, and I wanted to get it on paper.
        But as time went on, I knew it would be nice to have some software that could manage things a bit better than rewriting unfinished tasks.
        If you have any issues or find any bugs, please feel free to reply to this email.
        Thanks! Sincerely -Trevor from Check Off`
    })
}

const sendGoodbye = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "We are sorry to see you go!",
        text: `Hey there ${name}, \nWe hate to see you go, but understand if it's not working out.
        \nIf there is anything we can do, just reply to this email.
        \nAlso, we would love to hear why you left, and what we can do better to improve our product.
        \nThanks, sincerely \n- Check Off`
    })
}

const sendNewPass = (email, name, pass) => {
    sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "Your new password",
        text: `Hey ${name}
        We just updated your password to ${pass}
        Please use that to login and create a new password.
        If you didn't make this change, please reply to this email!
        Sincerely,
        ~Trevor from Check Off`
    })
}
module.exports = {
    sendWelcome,
    sendGoodbye,
    sendNewPass
}

// sgMail.send({
//     to: 'hauck.trevor@gmail.com',
//     from: 'hauck.trevor@gmail.com',
//     subject: 'Hey there, how are you today?',
//     text: 'How are you? A very easy question to ask, not always easy to answer'
// })