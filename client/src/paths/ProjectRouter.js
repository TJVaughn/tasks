import React, { Component } from 'react';
import { getAllProjects, getProjectById } from './Project-requests/GetProjects'
import { createProject } from './Project-requests/CreateProject'
import { BrowserRouter as Switch, Link } from "react-router-dom";
import { setCookie } from '../utils/cookies'

class ProjectRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            title: '',
            singleProject: {},
            projectID: '',
            error: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleCreateProject = this.handleCreateProject.bind(this)
        this.handleGetSingleProject = this.handleGetSingleProject.bind(this)
    }
    async handleGetAllProjects(){
        const response = await getAllProjects()
        if(response.error === 'Please authenticate') {
            setCookie('isLoggedIn', false)
            return window.location.replace('/login-signup')
        }
        this.setState({projects: response, title: ''})
    }
    componentDidMount(){
        this.handleGetAllProjects()
    }
    handleTitleChange(evt){
        this.setState({title: evt.target.value})
    }
    async handleCreateProject(evt){
        evt.preventDefault()
        const res = await createProject(this.state.title)
        this.setState({projectID: res._id})
        this.handleGetAllProjects()
    }
    async handleGetSingleProject(evt){
        const res = await getProjectById(evt.target.value)
        // console.log(res)
        this.setState({projectID: res._id})
        // setCookie('currProjectID', '', 1)
        this.setState({singleProject: res})
    }
    render(){
        const allProjectsMap = this.state.projects.map(item => 
            <div className="All-projects-titles-items-container" key={item._id}>
                <h2>
                    <Link className="All-projects-titles-items" to={`/project/${item._id}`}>{item.title}</Link>
                    <Switch />
                </h2>
                
            </div>
            )
    	return(
    		<div>
                {allProjectsMap.length > 0 
                ?<p><strong>Select an existing project</strong></p>
                :''}
                
                <div className="All-projects-titles-container">
                    {allProjectsMap}
                </div>
                <form onSubmit={this.handleCreateProject}>
                    <label>Create a new project: </label>
                    <input onChange={this.handleTitleChange} type="text" value={this.state.title} />
                    <button>Add Project</button>
                </form>
                
                <div>
                    {this.state.error}
                </div>
    		</div>
    	);
    }
}
export default ProjectRouter ;