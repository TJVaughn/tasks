import React, { Component } from 'react';
import { logoutUser, logoutUserFromAll } from './User-requests/LogoutUser'
import { checkOldPass, createNewPass } from './User-requests/UpdateUser'
import { setCookie } from '../utils/cookies'
import { getUser } from './User-requests/GetUser'

class ProfileSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            errmsg: ''
        }
        this.handleOldPassChange = this.handleOldPassChange.bind(this)
        this.handleNewPassChange = this.handleNewPassChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleLogOutFromAll = this.handleLogOutFromAll.bind(this)
    }
    postLogOut(){
        this.setState({loggedIn: false})
        setCookie("isLoggedIn", false, 365)
        window.location.reload()
    }
    async handleLogOut(){
        await logoutUser()
        this.postLogOut()
    }
    async handleLogOutFromAll(){
        await logoutUserFromAll()
        this.postLogOut()
    }
    handleOldPassChange(evt){
        this.setState({oldPass: evt.target.value})
    }
    handleNewPassChange(evt){
        this.setState({newPass: evt.target.value})
    }
    async handlePasswordChange(evt){
        evt.preventDefault()
        const profile = await getUser()
        console.log(profile)
        const res = await checkOldPass(profile.email, this.state.oldPass)
        if(!res){
            return this.setState({errmsg: 'Incorrect Pass'})
        }
        await createNewPass(this.state.newPass)
        this.setState({oldPass: '', newPass: '', errmsg: 'Success!'})
    }

    render(){
        const updatePass = <div>
            
            <form onSubmit={this.handlePasswordChange}>
                <h3>Update Password: </h3>
                <label >Old pass: </label>
                <input type='password' value={this.state.oldPass} onChange={this.handleOldPassChange} />
                <label>New pass: </label>
                <input type='password' value={this.state.newPass} onChange={this.handleNewPassChange} />
                <button>Update Password</button>
            </form>
            {this.state.errmsg}
        </div>
    	return(
    		<div>
                {updatePass}
                <h3 className="Pointer green" onClick={this.handleLogOutFromAll}>Log Out</h3>
    		</div>
    	);
    }
}
export default ProfileSettings ;