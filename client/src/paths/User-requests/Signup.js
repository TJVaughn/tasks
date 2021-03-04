import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { setCookie } from '../../utils/cookies'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputName: '',
            inputEmail: '',
            inputPass: '',
            errmsg: '',
            success: false
        }
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    async handleSubmit(evt){
        evt.preventDefault()
        if(this.state.inputPass.length < 8){
            return this.setState({errmsg: 'Password must be 8 or more characters'})
        }
        if(this.state.inputName < 2){
            return this.setState({errmsg: 'Name is required'})
        }
        const data = {
            "name": this.state.inputName,
            "email": this.state.inputEmail,
            "password": this.state.inputPass
        }
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
        const parsedResponse = await response.json()
        console.log(parsedResponse)
        if(parsedResponse.errmsg){
            return this.setState({errmsg: "Error! Invalid email"})
        }
        // removeCookie("AuthToken", "http://localhost:3000")
        setCookie("hasLoggedIn", true, 365)
        setCookie("userAddress", parsedResponse.userIP, 14)
        // setCookie("AuthToken", parsedResponse.token, 1)
        return this.setState({success: true, errmsg: ''})

    }
    handleChangeName(evt){
        this.setState({inputName: evt.target.value})
    }
    handleChangeEmail(evt){
        this.setState({inputEmail: evt.target.value})
    }
    handleChangePass(evt){
        this.setState({inputPass: evt.target.value})
    }

    render(){
    	return(
    		<div>
                <h2>Sign up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label><br />
                    <input type="text" value={this.state.inputName} onChange={this.handleChangeName} /><br />
                    <label>Email</label><br />
                    <input type="email" value={this.state.inputEmail} onChange={this.handleChangeEmail} /><br />
                    <label>Pass</label><br />
                    <input type="password" value={this.state.inputPass} onChange={this.handleChangePass} /><br />
                    <button>Sign up</button>
                </form>
                {this.state.errmsg}

                {this.state.success
                ? <Route>
                    <Redirect push to='/'/>
                </Route>
                :''}
    		</div>
    	);
    }
}
export default Signup ;