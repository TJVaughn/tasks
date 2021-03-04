import React, { Component } from 'react';
import { setCookie } from '../../utils/cookies'

const randomPass = () => {
    let randomString = ''
    let randomAscii = '';
    for(let i = 0; i <= 15; i++){
        randomAscii = Math.floor((Math.random() * 36) + 48 )
        randomString += String.fromCharCode(randomAscii)
    }  
    return randomString;
}

class ForgotPass extends Component {
    constructor(props){
        super(props)
        this.state = {
            input: '',
            errormsg: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(evt){
        this.setState({input: evt.target.value})
    }
    
    async updateUserByEmail(){
        const randomString = randomPass()
        setCookie("AuthToken", '', 0)
        const data = {
            "email": this.state.input,
            "password": randomString
        }
        const response = await fetch('/users/forgot-pass', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const resBody = await response.json()
        if(resBody.error === 'user not found'){
            setCookie("AuthToken", '', 0)
            // console.log(resBody)
            return this.setState({errormsg: 'email not found'})
        }
        this.setState({errormsg: "Success! Check your email..."})
        // console.log(resBody)
    }
    
    handleSubmit(evt){
        evt.preventDefault()
        this.updateUserByEmail()
    }   
    render(){
    	return(
    		<div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: </label> <br />
                    <input type="email" value={this.state.input} onChange={this.handleChange} /><br />
                    <button>Submit</button>
                </form>
                {this.state.errormsg}
    		</div>
    	);
    }
}
export default ForgotPass ;