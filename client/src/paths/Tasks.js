import React, { Component } from 'react';
import { BrowserRouter as Redirect } from "react-router-dom";
import { getAllIncompleteTasks } from './Task-requests/GetAllTasks'
import { createTask } from './Task-requests/CreateTask'
import { deleteTask } from './Task-requests/DeleteTask'
import { updateTask } from './Task-requests/UpdateTask'
import ProjectSettings from './ProjectSettings'
import CompletedTasks from '../modules/CompletedTasks'

class Tasks extends Component {
    constructor(props){
        super(props);
        this.state ={
            addNewTask: '',
            allTasksArr: [],
            errormsg: '',
            project: '',
            // pageTwoArr: [],
            loadMoreToggle: false,
            loading: true,
            completedTasksData: []
        }
        this.handleNewTaskChange = this.handleNewTaskChange.bind(this)
        this.handleCreateTask = this.handleCreateTask.bind(this)
        this.handleUpdateTaskCompleted = this.handleUpdateTaskCompleted.bind(this)
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.handleDragOver = this.handleDragOver.bind(this)
        this.handleDragDrop = this.handleDragDrop.bind(this)
    }
    async callGetAllTasks(){
        const allTasksArray = await getAllIncompleteTasks(this.props.id);
        // let pageTwoArray = []
        // if(allTasksArray.length > 13){
        //     const deleteCount = allTasksArray.length - 13;
        //     pageTwoArray = allTasksArray.splice(13, deleteCount)
        // }
        // this.setState({allTasksArr: allTasksArray, pageTwoArr: pageTwoArray})
        this.setState({allTasksArr: allTasksArray, loading: false, completedTasksData: []})
    }
    async componentDidMount(){
        this.callGetAllTasks()
    }

    handleNewTaskChange(evt){
        this.setState({addNewTask: evt.target.value})
    }

    handleCreateTask(evt){
        evt.preventDefault()
        // console.log(this.props.id)
        createTask(this.state.addNewTask, this.props.id)
        this.setState({addNewTask: ''})
        this.callGetAllTasks()
    }

    handleDeleteTask(evt){
        evt.preventDefault()
        deleteTask(evt.target.value)
        this.callGetAllTasks()
    }

    async handleUpdateTaskCompleted(evt){
        evt.preventDefault()
        await updateTask(evt.target.value)
        this.callGetAllTasks()
    }

    handleLoadMore(){
        if(!this.state.loadMoreToggle){
            return this.setState({loadMoreToggle: true})
        }
        return this.setState({loadMoreToggle: false})
    }

    handleDragOver(e){
        console.log("Dragging over")
        console.log(e)
    }
    handleDragDrop(e){
        console.log("Drag Drop")
        console.log(e)
    }
    render(){
        const allTasksMap = this.state.allTasksArr.map(item =>
            <div className={`Tasks-task ${item.completed ? 'completed':''}`} key={item._id}>
                <div className="Task-btn-con">
                    <button value={item._id}
                        onClick={this.handleUpdateTaskCompleted}
                        className={`Task-complete-btn Pointer Task-complete-btn-${item.completed ? 'complete':'incomplete' }`}>
                    </button>
                    {item.completed
                    ?<div className="Checkmark"><div className="Checkmark-2"></div></div>
                    :''}

                </div>
                <p>
                    {item.description}
                </p>
                <div className="Task-btn-con">
                    <button className="Task-delete-btn Pointer" value={item._id} onClick={this.handleDeleteTask}>X</button>
                </div>
            </div>
        )
        // const pageTwoMap = this.state.pageTwoArr.map(item =>
        //     <div className={`Tasks-task ${item.completed ? 'completed':''}`} key={item._id}>
        //         <div className="Task-btn-con">
        //             <button value={item._id}
        //                 onClick={this.handleUpdateTaskCompleted}
        //                 className={`Task-complete-btn Pointer Task-complete-btn-${item.completed ? 'complete':'incomplete' }`}>
        //             </button>
        //             {item.completed
        //             ?<div className="Checkmark"><div className="Checkmark-2"></div></div>
        //             :''}

        //         </div>
        //         <p>
        //             {item.description}
        //         </p>
        //         <div className="Task-btn-con">
        //             <button className="Task-delete-btn Pointer" value={item._id} onClick={this.handleDeleteTask}>X</button>
        //         </div>
        //     </div>
        // )
    	return(
    		<div>
                <ProjectSettings id={this.props.id} />
                <div>
                    <h2>Categories</h2>
                </div>
                <div className="Category-container">
                    <h3>GUI</h3>
                    <form className="Task-add-task-form" onSubmit={this.handleCreateTask}>
                        <button>Add new task: </button>
                        <input className="Input" value={this.state.addNewTask} onChange={this.handleNewTaskChange} />
                    </form>
                    {this.state.errormsg === 'Authentication error'
                        ? <Redirect push to='/login-signup' />
                        : ''}
                    <div>
                        {this.state.loading ? "...loading" : allTasksMap}

                    </div>
                </div>
                <div className="Category-container">
                    <h3>Done</h3>
                    {<CompletedTasks id={this.props.id} data={this.state.completedTasksData} />}
                    <form className="Task-add-task-form" onSubmit={this.handleCreateTask}>
                        <button>Add new task: </button>
                        <input className="Input" value={this.state.addNewTask} onChange={this.handleNewTaskChange} />
                    </form>
                    <hr />
                </div>
{/*
                {this.state.loadMoreToggle
                ? <div>
                    {pageTwoMap}
                    <p className="Pointer green" onClick={this.handleLoadMore}>...load less</p>
                </div>
                :<p className="Pointer green" onClick={this.handleLoadMore}>...load more</p>}
                 */}
    		</div>
    	);
    }
}
export default Tasks ;
