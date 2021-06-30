import React, { Component } from 'react';
import { updateProject } from './Project-requests/UpdateProject'
import { getProjectById } from './Project-requests/GetProjects'
import DeleteProjectForm from './DeleteProjectForm'
import AddCategory from '../modules/AddCategory';

class ProjectSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
            project: {},
            titleToggle: false,
            projectTitleInput: '',
            delProjToggle: false
        }
        this.handleDeleteProjectClick = this.handleDeleteProjectClick.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleUpdateProject = this.handleUpdateProject.bind(this)
        this.handleTitleClick = this.handleTitleClick.bind(this)
        this.handleProjectTitleInputChange = this.handleProjectTitleInputChange.bind(this)
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
    }
    
    async handleGetProject(){
        const projectBody = await getProjectById(this.props.id)
        this.setState({project: projectBody})
    }
    handleDeleteProjectClick(){
        if(!this.state.delProjToggle){
            return this.setState({delProjToggle: true})
        }
        return this.setState({delProjToggle: false})
    }
    
    handleToggle(){
        if(!this.state.toggle){
            return this.setState({toggle: true})
        }
        this.setState({toggle: false})
    }
    async handleUpdateProject(){
        await updateProject(this.props.id, this.state.projectTitleInput)
        // console.log(res)
        this.setState({projectTitleInput: '', titleToggle: false})
        this.handleGetProject()
    }
    handleTitleClick(){
        const currTitle = this.state.project.title
        if(!this.state.titleToggle){
            return this.setState({titleToggle: true, projectTitleInput: currTitle})
        }
        return this.setState({titleToggle: false})
    }
    handleProjectTitleInputChange(evt){
        this.setState({projectTitleInput: evt.target.value})
    }  
    handleUpdateSubmit(evt){
        evt.preventDefault()
        this.handleUpdateProject()
    } 
    componentDidMount(){
        this.handleGetProject()    
    }
    render(){
    	return(
            <div>
    		    <div className="Project-header">
                {/* <div onClick={this.handleTitleClick} className="Project-title Pointer green"> */}
                    <div className="Project-title Pointer green">
                    {this.state.titleToggle
                    ? <h2>
                        <form onSubmit={this.handleUpdateSubmit}>
                            <input className="input" onChange={this.handleProjectTitleInputChange} value={this.state.projectTitleInput} />
                            <button className="btn btn-action">Update</button>
                        </form>
                    </h2>
                    :<h2>
                        {this.state.project.title}
                    </h2>}
                    
                </div>
                <div className="Project-settings btn">
                    
                    <h4 className="Pointer white" onClick={this.handleToggle}>Settings</h4>

                    {this.state.toggle
                    ?<div className="Project-settings-settings">
                        <p className="Pointer white" onClick={this.handleTitleClick}>Update Title</p>
                        {/* <p className="Pointer white">Update Title</p> */}
                        <p className="Pointer white" onClick={this.handleDeleteProjectClick} >Delete Project</p>
                        {this.state.delProjToggle
                        ?<DeleteProjectForm id={this.props.id} />
                        :''}
                    </div>
                :''}
                </div>
                <p></p>
                </div>
                {this.state.toggle ? <AddCategory id={this.props.id} /> : ''}
    		</div>
    	);
    }
}
export default ProjectSettings ;