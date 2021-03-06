import React, { Component } from 'react';
import Axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    async handleSubmit(evt) {
        evt.preventDefault()
        let res = await Axios({
            url: '/api/quote/email-signup',
            method: 'POST',
            data: {
                email: this.state.email
            },
            responseType: 'json'
        })
        console.log(res)
        if (res.data.error) {
            return this.setState({ message: "Email already signed up" })
        }
        this.setState({ email: '', message: "Success! Check your email for verification." })
        return
    }
    render() {
        return (
            <div style={{"textAlign": "center"}}>
                <h2>Quotes in your inbox</h2>
                <p>
                    Get the quote of the day automatically in your inbox every day!
                </p>
                <strong>
                    {this.state.message}
                </strong>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: </label><br />
                    <input style={{"width": "80%"}} name="email" type="email" value={this.state.email} onChange={this.handleChange} /><br />
                    <span className="quiet">We will never spam you or anything weird, just quotes!</span><br />
                    <button>subscribe</button>
                </form>
            </div>
        );
    }
}
export default Signup;