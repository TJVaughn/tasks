import React, { Component } from 'react';
import Signup from './User-requests/Signup'
import Login from './User-requests/Login'
import { getCookie } from '../utils/cookies'

class LoginSignupContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            signup: true,
            login: false,
            fadeOut: '',
            fadeIn: ''
        }
        this.handleSwitch = this.handleSwitch.bind(this)
    }
    componentDidMount(){
        if(!getCookie('hasLoggedIn')){
            return null
        }
        return this.setState({ signup: false, login: true})
    }
    handleSwitch(){
        if(this.state.signup){
            this.setState({fadeOut: 'fade-out', fadeIn: ''})
            setTimeout(() => {
                return this.setState({signup: false, login: true, fadeOut: '', fadeIn: 'fade-in'})
            }, 500)
        } else {
            this.setState({fadeOut: 'fade-out', fadeIn: ''})
            setTimeout(() => {
                return this.setState({signup: true, login: false, fadeOut: '', fadeIn: 'fade-in'})
            }, 500)
        }
        
    }
    render(){
        // const renderLogin = <div><Login /></div>
        // const renderSignup 
    	return(
    		<div className="LoginSignupContainer">

    			{this.state.signup
                ? <div className={`${this.state.fadeOut} ${this.state.fadeIn}`}><Signup /></div>
                : <div className={`${this.state.fadeOut} ${this.state.fadeIn}`}> <Login /> </div>}
                <div className="Pointer green" onClick={this.handleSwitch}>
                    {this.state.signup
                    ? <div>Already have an account? Login</div>
                    : <div>Don't have an account? Sign up</div>}
                    
                    </div>
    		</div>
    	);
    }
}
export default LoginSignupContainer ;