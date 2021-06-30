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
            error: '',
            loading: true,
            newProject: false
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
        this.setState({ projects: response, title: '', loading: false })
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
                <div className="float">
                    <h1>Projects</h1>
                    {allProjectsMap.length > 0 
                    ?<div></div>
                    :<div>Add a new project =&gt;</div>}
                    <div>
                        <button onClick={() => {this.setState({newProject: !this.state.newProject})}} 
                        title="Add a new project" className="btn">Add</button>
                    </div>
                </div>
                {this.state.newProject
                ?<form onSubmit={this.handleCreateProject}>
                    <h2>Create New Project</h2>
                    <input className="input" placeholder="New project" onChange={this.handleTitleChange} type="text" value={this.state.title} />
                    <button className="btn btn-action">Create</button>
                </form>
                :""}
                
                <div className="All-projects-titles-container">
                    {this.state.loading ? "...loading" : allProjectsMap }
                </div>
                
                
                
                <div>
                    {this.state.error}
                </div>
    		</div>
    	);
    }
}
export default ProjectRouter ;