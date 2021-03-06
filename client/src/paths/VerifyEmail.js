import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Axios from "axios"

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVerified: false
        }
    }
    async verifyEmailFunction() {
        let res = await Axios({
            url: `/api/email/verify-email${this.props.location.search}`,
            method: 'GET',
            responseType: 'json'
        })
        console.log(res)
        if (res.data.success) {
            return this.setState({ isVerified: true })
        }
        return this.setState({ isVerified: false })
    }
    async componentDidMount() {
        await this.verifyEmailFunction()
    }
    render() {
        return (
            <div>
                <div>
                    <h1>Verify your email</h1>
                    {this.state.isVerified ? <div>
                        <p>
                            Success! <Link to="/">Return to home</Link>
                        </p>
                    </div> : 'Error'}
                    {/* {console.log(verifyEmailFunction())} */}
                    {/* {console.log(this.props.location.search)} */}
                </div>
            </div>
        )
    }
}
export default VerifyEmail