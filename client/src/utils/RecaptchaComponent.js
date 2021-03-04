// import React, { Component } from 'react';
// import { ReCaptcha } from 'react-recaptcha-v3'
// import { loadReCaptcha } from 'react-recaptcha-v3'

// class RecaptchaComponent extends Component {
//     componentDidMount(){
//         loadReCaptcha('6LfHztYUAAAAAEW6kZhpPmc3bWdxePGiLWZ7dAY_')
//     }
//     verifyCallback = (recaptchaToken) => {
//         // console.log(recaptchaToken)
//         this.handleVerifyToken(recaptchaToken)
//     }
//     async handleVerifyToken(token){
//         const data = {
//             "publicKey": token
//         }
//         const response = await fetch('/api/recaptcha', {
//             method: 'POST',
//             headers: {
// 				'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         const body = await response.json()
//         console.log('true')
//         if(!body.success) {
//             console.log('False!')
//         }
//     }
//     render(){
//     	return(
//     		<div>
//                 <ReCaptcha 
//                     sitekey="6LfHztYUAAAAAEW6kZhpPmc3bWdxePGiLWZ7dAY_"
//                     action="login"
//                     verifyCallback={this.verifyCallback}
//                 />
//     		</div>
//     	);
//     }
// }
// export default RecaptchaComponent ;