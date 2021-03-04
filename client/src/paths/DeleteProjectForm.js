import React, { Component } from 'react';
import { deleteProject } from './Project-requests/DeleteProject'

class DeleteProjectForm extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    async handleDeleteProject(){
        await deleteProject(this.props.id)
        window.location.replace('/')
    }
    handleClick(){
        this.handleDeleteProject()
    }
    render(){
    	return(
    		<div className="Delete-project-form">
    			<p><strong>Are you sure?</strong></p>
                <p className='Pointer Delete-project-btn' onClick={this.handleClick}>DELETE</p>
    		</div>
    	);
    }
}
export default DeleteProjectForm ;