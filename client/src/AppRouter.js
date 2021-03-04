import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Profile from './paths/Profile'
import { getCookie } from './utils/cookies'
import Tasks from './paths/Tasks'
import Landing from './paths/Landing'
import ProjectRouter from './paths/ProjectRouter'
import LoginSignupContainer from './paths/LoginSignupContainer'
import ProfileSettings from './paths/ProfileSettings'
import Quote from './modules/Quote';
// import RecaptchaComponent from './utils/RecaptchaComponent'

const loggedIn = () => {
    if(getCookie('isLoggedIn') === 'true'){
        return true
    }
    return false
}

function Index(){
    return (
        <div>
            {loggedIn()
            ? <div>
                <ProjectRouter />
            </div>
            : <div>
                <Landing />
                <Link to={'/login-signup/'}>Try it out</Link>
            </div>}
        </div>
    )
}
function SingleProjectRouter(props){
    return (
        <div>
            <Tasks id={props.match.params.id} />
        </div>
    )
}

function ProfileRouter(){
    return(
        <div>
            <Profile />
        </div>
    )
}
function ProfileSettingsRouter(){
    return (
        <div>
            {loggedIn()
            ?<ProfileSettings />
            :<Redirect to={'/login-signup/'}/>}
            
        </div>
    )
}

function LoginSignupRouter(){
    // useScript("https://www.google.com/recaptcha/api.js?render=6LfHztYUAAAAAEW6kZhpPmc3bWdxePGiLWZ7dAY_")
    
    return (
        <div>
            {/* <RecaptchaComponent /> */}
            <LoginSignupContainer />
        </div>
    )
}


class AppRouter extends Component {

    navbarMenu(){
        return (
            <div className="Site-Navigation">
                <div>
                    
                    <Link to={'/'} ><h1 id="Site-title">TaskWorks.co</h1></Link>
                </div>
                {loggedIn()
                ? <div>
                    <Link to={'/profile/'} >Profile</Link>
                </div>
                :<div>
                    <Link to={'/login-signup/'}>Login/signup</Link>
                </div>}
                
                
            </div>
        )
    }

    render(){
        return (
            <div>
                <Router>
                {this.navbarMenu()}
                    <Switch>
                        <Route path={'/'} exact component={Index} />
                        <Route path={'/profile/'} component={ProfileRouter} />
                        <Route path={'/login-signup/'} component={LoginSignupRouter} />
                        <Route path={'/profile-settings/'} component={ProfileSettingsRouter} />
                        <Route path={'/project/:id'} component={SingleProjectRouter}/>
                    </Switch>
                </Router>
                <Quote />
            </div>
        )
    }
}

export default AppRouter;