import React, { Component } from 'react';
import AppRouter from './AppRouter'
import './styles/index.css'
import './styles/App.scss';
import './styles/Nav.scss'
import './styles/Tasks.scss'
import './styles/LoginSignup.scss'
import './styles/Profile.scss'
import './styles/Project.scss'

class App extends Component {
  render(){
    return (
      <div className="App"> 
        <AppRouter />
      </div>
    )
  }
}


export default App;
