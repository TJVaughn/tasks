import React, { Component } from 'react';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import { getUser } from './User-requests/GetUser'
import { updateUserName } from './User-requests/UpdateUser'
import profilePicture from '../logo.svg'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: {},
            loggedIn: true,
            showUpdateProfile: false,
            updateName: '',
            errmsg: ''
        }
        this.handleUpdateProfileBtn = this.handleUpdateProfileBtn.bind(this)
        this.handleUpdateName = this.handleUpdateName.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)

    }
    async callGetUser(){
        const user = await getUser()
        this.setState({profile: user})
    }
    componentDidMount(){
        this.setState({loggedIn: true})
        this.callGetUser()
    }

    handleUpdateProfileBtn(){
        if(!this.state.showUpdateProfile){
            return this.setState({showUpdateProfile: true, updateName: this.state.profile.name})
        }
        this.setState({showUpdateProfile: false})
    }
    async handleUpdateName(evt){
        evt.preventDefault()
        await updateUserName(this.state.updateName)
        this.callGetUser()
        this.setState({updateName: '', showUpdateProfile: false})
    }
    handleNameChange(evt){
        this.setState({updateName: evt.target.value})
    }

    render(){
        const updateName = 
        <form onSubmit={this.handleUpdateName}>
            <h3>
                <input type="text" value={this.state.updateName} onChange={this.handleNameChange} />
                <button>Update</button>
            </h3>
        </form>
        
    	return(
    		<div>
                <div className="Profile-container">
                    <div>
                        <img className="Profile-picture" alt='Profile' src={profilePicture} />
                    </div>
                    <div className="Profile-info">
                        {this.state.showUpdateProfile
                        ? updateName
                        :<h3 title="Click to change" 
                            className="Pointer green" 
                            onClick={this.handleUpdateProfileBtn}>
                            {this.state.profile.name}
                        </h3>}
                        
                        <h4>{this.state.profile.email}</h4>
                    </div>
                </div>
                <Switch />
                <Link to='/profile-settings/'>Settings</Link>
    		</div>
    	);
    }
}
export default Profile ;