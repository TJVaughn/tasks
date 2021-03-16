import React, { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import axios from 'axios'
import { deleteTask } from '../paths/Task-requests/DeleteTask'
import { updateTask } from '../paths/Task-requests/UpdateTask'
import AddCategory from './AddCategory'
import ProjectSettings from '../paths/ProjectSettings'

export default function Categories(props) {

  const [allCategories, setAllCategories] = useState([
    {
      tasks: [
        {
          description: '', 
          completed: false, 
          _id: ''
        }
      ],
      category: {
        _id: '',
        title: '',
        project: ''
      }
    }
  ])
  const [deleteHover, setDeleteHover] = useState(false)
  const [categorySettings, setCategorySettings] = useState([])

  const getAllCategories = async() => {
    let res = await axios.get(`/tasks?project=${props.id}`)
    console.log(res.data)
    // for(let i = 0; i < res.data.length;i++){
    //   categorySettings.push(null)
    //   console.log(i)
    // }
    setAllCategories(res.data)

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
  const handleDeleteCategory = async (evt) => {
    evt.preventDefault()
    // console.log(evt.target.attributes[1].value)
    let _id = evt.target.attributes[1].value
    let res = await axios.delete(`/api/category/${_id}`)
    console.log(res)
    setCategorySettings([])
    getAllCategories()
  }
  const handleUpdateCategory = async (evt) => {
    evt.preventDefault()
  }
  const handleSettings = async (i) => {
    categorySettings[i] = !categorySettings[i]
    getAllCategories()
  }
  
  useEffect( () => {
    //component mounts, run this
    getAllCategories()
    // callGetAllTasks()
  }, [])

  return (
    <div>
      <ProjectSettings id={props.id} />
      <CreateTask categories={allCategories} action={getAllCategories} id={props.id} />
      {allCategories.map((item, i) => {
        return (
          <div key={item.category._id}>
            <div style={{"display": "grid", "gridTemplateColumns": "95% 5%",
            "textAlign": "center", "fontWeight": 700, "border": "1px solid #fff", "borderRadius": "5px", "borderBottom": "0", "marginBottom": 0, "padding": "10px 0"}}>
              <p style={{"padding": "0 5px"}}>
                {item.category.title}
              </p>
              <div onClick={() => {handleSettings(i)}} style={{"cursor": "pointer", "padding": "0 5px"}}>
                📝
              </div>
              <ul style={categorySettings[i] ? {"display": "inline", "listStyleType": "none"}:{"display": "none"}}  >
                  <li value={item.category._id} onClick={handleUpdateCategory}>Rename</li>
                  <li value={item.category._id} onClick={handleDeleteCategory} style={{"color": "red", "fontWeight": 700, "margin": "10px", "cursor": "pointer"}}>Delete</li>
              </ul>
            </div>
            {/* <hr style={{"color": "#fff"}} /> */}
            <div className="Category-container">
            {item.tasks.map((task) => {

              return (
                <div className={`Tasks-task ${task.completed ? 'completed':''} ${deleteHover? 'delete':''}`} key={task._id}>
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
                      <button onMouseEnter={() => {setDeleteHover(true)}} onMouseLeave={() => {setDeleteHover(false)}} className="Task-delete-btn Pointer" value={task._id} onClick={handleDeleteTask}>X</button>
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

