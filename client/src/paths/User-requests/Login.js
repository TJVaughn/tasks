import React, { Component } from 'react';
import { setCookie } from '../../utils/cookies'
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import ForgotPass from './ForgotPass'
// import RecaptchaComponent from '../../utils/RecaptchaComponent'

class Login extends Component {
	constructor(props){
		super(props);
		this.state ={
			email: '',
			pass: '',
			redirectToHome: false,
			forgotPass: false,
			errormsg: ''
		}
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePassChange = this.handlePassChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.forgotPassHandler = this.forgotPassHandler.bind(this)
	}

	async handleSubmit(evt){
		evt.preventDefault()
		const loginData = {
			"email": this.state.email,
			"password": this.state.pass,
		}
		const response = await fetch('/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginData)
		})
		const body = await response.json()
		if(body.error === 'Unable to login'){
			return this.setState({errormsg: body.error})
		}
		setCookie("hasLoggedIn", true, 365)
		setCookie("isLoggedIn", true, 14)
		setCookie("userAddress", body.userIP, 14)
		this.setState({redirectToHome: true, errormsg: ''})
		window.location.reload()
		
	}

	handleEmailChange(evt){
		this.setState({email: evt.target.value})
	}

	handlePassChange(evt){
		this.setState({pass: evt.target.value})
	}
	forgotPassHandler(){
		if(!this.state.forgotPass){
			return this.setState({forgotPass: true})
		}
		return this.setState({forgotPass: false})
	}

    render(){
    	return(
    		<div>
				{/* <RecaptchaComponent /> */}
				<h2>Log In</h2>
    			<form onSubmit={this.handleSubmit}>
					{/* <label>Email</label><br /> */}
					<input className="input" placeholder="email" type="email" value={this.state.email} onChange={this.handleEmailChange} /><br />
					{/* <label>Password</label><br /> */}
					<input className="input" placeholder="password" type="password" value={this.state.pass} onChange={this.handlePassChange} /><br />
					<button className="btn-action btn">Login</button>
				</form>
				{this.state.errormsg}
				<p className="Pointer green" onClick={this.forgotPassHandler}>Forgot Password?</p>
				{this.state.forgotPass
				? <ForgotPass />
				:''}
				
				{this.state.redirectToHome
				?<Route><Redirect to='/' /></Route>
				:''}
    		</div>
    	);
    }
}
export default Login ;