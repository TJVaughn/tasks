const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const QuoteEmailList = require('../models/QuoteEmailList')

const sendDailyQuote = async (quote) => {
    const allUsers = await QuoteEmailList.find({ isVerified: true })
    for (let i = 0; i < allUsers.length; i++) {
        await sendEmail(allUsers[i].email, quote)
    }
}

const chooseCharity = () => {
    let today = new Date()
    let charity = {
        name: "",
        link: "",
        snippet: ""
    }
    if (today.getDay() === 0) {
        //sunday
        charity.name = 'The Water Project'
        charity.link = 'https://thewaterproject.org/'
        charity.snippet = `The Water Project, Inc. is a 501(c)(3) non-profit organization unlocking human potential by providing reliable water projects to communities in 
        sub-Saharan Africa who suffer needlessly from a lack of access to clean water and proper sanitation.
        For ten years, we have been helping communities gain access to clean, safe water by providing training, 
        expertise and financial support for water project construction through our staff and implementing partners.`
    } else if (today.getDay() === 1) {
        //monday
        charity.name = 'Partnership With Native Americans'
        charity.link = 'http://www.nativepartnership.org/site/PageServer?pagename=pwna_home'
        charity.snippet = `Partnership With Native Americans (PWNA) is a 501c3 nonprofit committed to championing hope for a brighter future for 
        Native Americans living on remote and impoverished reservations. Collaborating with reservation partners, we provide immediate relief and 
        support long-term solutions for strong, self-sufficient Native American communities. PWNA is a trusted partner and resource for Native Americans 
        with the highest needs in the U.S. We care about quality of life and the self-determined goals of the tribes. Formerly known as National Relief Charities, 
        we provide critical supplies like food and water; support education, capacity building for emerging leaders, and community-led initiatives for sustainable gains; 
        and connect outside resources to the reservations.`
    } else if (today.getDay() === 2) {
        //tuesday
        charity.name = 'The Loveland Foundation'
        charity.link = 'https://thelovelandfoundation.org/'
        charity.snippet = `The Loveland Foundation is committed to showing up for communities of color in unique and powerful ways, with a particular focus on Black women and girls. 
        Our resources and initiatives are collaborative and they prioritize opportunity, access, validation, and healing. We are becoming the ones we’ve been waiting for.`
    } else if (today.getDay() === 3) {
        //wednesday
        charity.name = 'Sponsors for Educational Opportunity'
        charity.link = 'https://www.seo-usa.org/'
        charity.snippet = `Sponsors for Educational Opportunity was founded in 1963 with a mission to provide talented and motivated young people from underserved and underrepresented communities
         with access to superior educational and career opportunities. Today, SEO runs three programs: SEO Scholars is an eight-year academic program that gets low-income 
         public high school students to and through college-with a 95% college graduation rate; SEO Career is the nation's premier summer internship and training program 
         for underrepresented college students, specializing in banking, private equity, corporate leadership, law, and non-profit; SEO Alternative Investments provides 
         education, exposure, training and mentoring opportunities to talented professionals traditionally underrepresented in the alternative investments sector.`
    } else if (today.getDay() === 4) {
        //thursday
        charity.name = 'Free From'
        charity.link = 'https://www.freefrom.org/'
        charity.snippet = `The Mission: Our mission is to create pathways to financial security and long-term safety that support survivors of gender-based violence. 
        We envision a world where survivors have sustaining income, savings and credit with which to build wealth and the resources to support individual, intergenerational
        and community healing.
        We envision a world where harm-doers are held financially accountable and survivors are not saddled with the cost of being harmed. 
        We envision a world where gender-based violence receives the attention necessary to address it as a systemic issue.`
    } else if (today.getDay() === 5) {
        //friday
        charity.name = 'Support Rynn Star via The Cash App'
        charity.link = 'https://cash.app/$WordLady907'
        charity.snippet = `Today is a little different. We are featuring one of our favorite creators. Rynn Star is an excellent content creator who often speaks out and 
        informs the world about racial issues in the US. <a href="https://www.tiktok.com/@rynnstar" >Check out her tiktok.</a>`
    } else {
        //saturday
        charity.name = 'National LGBTQ Task Force'
        charity.link = 'https://www.thetaskforce.org/'
        charity.snippet = `The National LGBTQ Task Force was founded in 1973, the National Gay and Lesbian Task Force Foundation (NGLTF) works to build the grassroots power of the lesbian, gay, 
        bisexual and transgender (LGBT) community. We do this by training activists, equipping state and local organizations with the skills needed to organize 
        broad-based campaigns to defeat anti-LGBT referenda and advance pro-LGBT legislation, and building the organizational capacity of our movement. 
        Our Policy Institute, the movement's premier think tank, provides research and policy analysis to support the struggle for complete equality and to counter 
        right-wing lies. As part of a broader social justice movement, we work to create a nation that respects the diversity of human expression and identity and 
        creates opportunity for all.`
    }
    return charity
}

const sendEmail = async (email, quote) => {
    let url = ''
    if (process.env.NODE_ENV === 'production') {
        url = 'https://tjvaughn-zen.herokuapp.com'
    } else {
        url = 'http://localhost:3000'
    }
    let { name, link, snippet } = chooseCharity()
    const msg = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Your Daily Quote',
        html: `
        <h1>Your Quote: </h1>
        <h2>
            "${quote.message}"
        </h2>
        <h3>
            --${quote.source}
        </h3>
        <p>
        ...
        </p>
        
        <p style="font-size: 0.8em;" >
            We'd hate to see you go, but if you wish to <a href="${url}/email/unsubscribe?email=${email}" >unsubscribe</a>, we understand.
        </p>
        `,
    };
    sgMail.send(msg);
}

module.exports = sendDailyQuote

// `
//         <h2>Interested in helping?</h2>
//         <p>
//             For each day of the week we have chosen to support a different charity or individual. 
//         </p>
//         <p>
//             Today we are supporting <a href="${link}" >${name}</a>. 
//         </p>
//         <p>
//         ${snippet}
//         </p>

//         <hr />

//         <h1>Your Quote: </h1>
//         <h2>
//             "${quote.message}"
//         </h2>
//         <h3>
//             --${quote.source}
//         </h3>

//         <p>
//         ...
//         </p>

//         <p style="font-size: 0.8em;" >
//             We'd hate to see you go, but if you wish to <a href="${url}/email/unsubscribe?email=${email}" >unsubscribe</a>, we understand.
//         </p>
//         `
