import React, { Component } from 'react';
import { getUser } from './User-requests/GetUser'
import { logoutUserFromAll } from './User-requests/LogoutUser';
import { checkOldPass, createNewPass, updateUserName } from './User-requests/UpdateUser'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: {},
            loggedIn: true,
            viewSettings: false,
            name: '',
            errmsg: '',
            oldPass: '',
            newPass: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdateName = this.handleUpdateName.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    async handleLogOutFromAll(){
        await logoutUserFromAll()
    }
    async callGetUser(){
        const user = await getUser()
        this.setState({profile: user, name: user.name})
    }
    componentDidMount(){
        this.setState({loggedIn: true})
        this.callGetUser()
    }
    async handleUpdateName(evt){
        evt.preventDefault()
        await updateUserName(this.state.name)
        this.callGetUser()
        this.setState({name: '', showUpdateProfile: false})
    }
    handleChange(evt){
        console.log(evt.target.value)
        this.setState({[evt.target.name]: evt.target.value})
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
        const updateName = 
        <form onSubmit={this.handleUpdateName}>
            <h3> Update Name
                <input name="name" className="input" type="text" value={this.state.name} onChange={this.handleChange} />
                <button className="btn btn-action">Update</button>
            </h3>
        </form>

        const updatePass = <div>
            
            <form onSubmit={this.handlePasswordChange}>
                <h3>Update Password: </h3>
                <label >Old password: </label><br />
                <input className="input" placeholder="Old Password" name="oldPass" type='password'
                 value={this.state.oldPass} onChange={this.handleChange} />
                <label>New password: </label><br />
                <input className="input" placeholder="New Password" name="newPass" type='password'
                 value={this.state.newPass} onChange={this.handleChange} />
                <button className="btn btn-action">Update Password</button>
            </form>
            {this.state.errmsg}
        </div>
        
    	return(
    		<div>
                <div className="jumbo">
                    <h1 className="title">{this.state.profile.name}</h1>
                    <div className="row">
                        <p className="col">{this.state.profile.email} </p>
                    </div>
                </div>
                <div>
                <h3 className="Pointer green" onClick={()=>{this.setState({viewSettings: !this.state.viewSettings})}} >Settings</h3>
                {this.state.viewSettings
                ?<div>
                    {updateName}
                    {updatePass}
                    <h3 className="Pointer green" onClick={()=>{logoutUserFromAll()}}>Log out from all devices</h3>
                </div>:''
                }
    		</div>
    		</div>
    	);
    }
}
export default Profile ;