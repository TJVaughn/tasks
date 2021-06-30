import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Profile from './paths/Profile'
import Landing from './paths/Landing'
import ProjectRouter from './paths/ProjectRouter'
import LoginSignupContainer from './paths/LoginSignupContainer'
import Categories from './modules/Categories'
import { logoutUserFromAll } from './paths/User-requests/LogoutUser';
import loggedIn from './utils/loggedIn';
import './styles/index.css'
import './styles/App.scss';
import './styles/Nav.scss'
import './styles/Tasks.scss'
import './styles/LoginSignup.scss'
import './styles/Profile.scss'
import './styles/Project.scss'
const isAuthenticated = loggedIn()

function Index(){
    return (
        <div>
            {isAuthenticated ? <ProjectRouter /> : <Redirect to={'/land'} /> }
        </div>
    )
}
function SingleProjectRouter(props){
    return (
        <div>
            <Categories id={props.match.params.id}/>
        </div>
    )
}

function ProfileRouter(){
    return(
        <div>
            {isAuthenticated 
            ? <div>
                <Profile />
            </div>
            : <Redirect to={'/land'} /> }
        </div>
    )
}

function LoginSignupRouter(){
    return (
        <div>
            <LoginSignupContainer />
        </div>
    )
}


class App extends Component {

    navbarMenu(){
        return (
            <div className="Site-Navigation">
                <div>

                    <Link to={'/'} ><h2 id="Site-title">Check Off</h2></Link>
                </div>
                {isAuthenticated
                ? <div>
                    <Link to={'/profile/'} >Profile</Link>
                    <button onClick={() => {logoutUserFromAll()}} className="btn">Logout</button>

                </div>
                :<div>
                    <Link to={'/login-signup/'}>Login/signup</Link>
                </div>}


            </div>
        )
    }

    render(){
        return (
            <div className="App">
                <Router>
                    {this.navbarMenu()}
                    <hr />
                    <Switch>
                        <Route path={'/'} exact component={Index} />
                        <Route path={'/profile/'} component={ProfileRouter} />
                        <Route path={'/project/:id'} component={SingleProjectRouter}/>
                        <Route path={'/land'} component={Landing} />
                        <Route path={'/login-signup/'} component={LoginSignupRouter} />
                    </Switch>
                </Router>
                <div className="margin-bottom-50" style={{ "color": "#ffffff00" }}>z</div>
                <div className="margin-bottom-50" style={{ "color": "#ffffff00" }}>z</div>
            </div>
        )
    }
}

export default App;
