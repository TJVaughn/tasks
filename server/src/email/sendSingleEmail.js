const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require('../models/User')

const sendSingleEmail = async (subject, message) => {
    const allUsers = await User.find()
    for (let i = 0; i < allUsers.length; i++) {
        console.log(allUsers[i].email)
        await sendEmail(allUsers[i].email, subject, message)
    }
}

const sendEmail = async (email, subject, message) => {
    let url = ''
    if (process.env.NODE_ENV === 'production') {
        url = 'https://tjvaughn-zen.herokuapp.com/'
    } else {
        url = 'http://localhost:3000'
    }
    const msg = {
        to: email,
        from: 'quote@ancientwisdom.io',
        subject: subject,
        html: message
    };
    sgMail.send(msg);
}

module.exports = sendSingleEmail

// Hey there, 

        // <p>Today I am asking a favor of you. There is no obligation or requirement, just an ask from me with hat in hand.
        // </p>
        // <p>
        // As you may know, operating a website involves some small costs, that add up over time. 
        // So I am asking you, if you are able, to donate $5 to help me cover these costs(hosting, domain...etc).
        // <a href="https://www.paypal.com/donate?hosted_button_id=LUV97KNZB5PDY">Donate Here</a>
        // </p>
        // <p>

        // If you have gotten that much in value this year, or you just want to help out, I would greatly appreciate the help.
        // </p>
        // <p>
        // If not, I completely understand.
        // Enjoy the quotes, and if you have any feedback, requests or concerns, you can tweet me @ancientwisbot. 
        // <a href="https://twitter.com/ancientwisbot">Twitter</a>
        // </p>
        // <p>
        // Thank you and have a wonderful day!
        // </p>