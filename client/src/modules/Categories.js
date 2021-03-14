import React, { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import axios from 'axios'
import { deleteTask } from '../paths/Task-requests/DeleteTask'
import { updateTask } from '../paths/Task-requests/UpdateTask'
import AddCategory from './AddCategory'

export default function Categories(props) {

  const [allCategories, setAllCategories] = useState([{category: '', tasks: [{task: ''}]}])
  const getAllCategories = async() => {
    let res = await axios.get(`/tasks?project=${props.id}`)
    setAllCategories(res.data)
    console.log(res.data)
  }

  const handleUpdateTaskCompleted = async (evt) => {
    evt.preventDefault()
    await updateTask(evt.target.value)
    getAllCategories()

  }
  const handleDeleteTask = async (evt) => {
    evt.preventDefault()
    await deleteTask(evt.target.value)
    getAllCategories()
  }
  
  useEffect( () => {
    //component mounts, run this
    getAllCategories()
    // callGetAllTasks()
  }, [])

  return (
    <div>
      <CreateTask categories={allCategories} action={getAllCategories} id={props.id} />
      <AddCategory action={getAllCategories} id={props.id} />
      {allCategories.map(item => {
        let tasks = item.tasks
        return (
          <div key={item.category._id}>
            <p style={{"textAlign": "center", "fontWeight": 700, "border": "1px solid #fff", "borderRadius": "5px", "borderBottom": "0", "marginBottom": 0, "padding": "10px 0"}}>
              {item.category.title}
            </p>
            {/* <hr style={{"color": "#fff"}} /> */}
            <div  className="Category-container">
            {tasks.map((task) => {

              return (
                <div className={`Tasks-task ${task.completed ? 'completed':''}`} key={task._id}>
                  <div className="Task-btn-con">
                      <button value={task._id}
                          onClick={handleUpdateTaskCompleted}
                          className={`Task-complete-btn Pointer Task-complete-btn-${task.completed ? 'complete':'incomplete' }`}>
                      </button>
                      {task.completed
                      ?<div className="Checkmark"><div className="Checkmark-2"></div></div>
                      :''}
    
                  </div>
                  <p>
                      {task.description}
                  </p>
                  <div className="Task-btn-con">
                      <button className="Task-delete-btn Pointer" value={task._id} onClick={handleDeleteTask}>X</button>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
