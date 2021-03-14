import React,  { useState, useEffect } from 'react'
import { getAllCompletedTasks } from '../paths/Task-requests/GetAllTasks'
import { deleteTask } from '../paths/Task-requests/DeleteTask'

function CompletedTasks(props){
  const [tasks, setTasks] = useState([{description: '...loading', _id: '483572394085672908'}])

  const getTasks = async () => {
    let res = await getAllCompletedTasks(props.id)
    // console.log(res)
    setTasks(res)
    return
  }
  useEffect(() => {
      //component mounts, run this
      getTasks()
    }, [setTasks])
    const handleUpdateTaskCompleted = () => {

    }
    const handleDeleteTask = (evt) => {
      evt.preventDefault()
      deleteTask(evt.target.value)
      getTasks()
    }
    return (
      <div>
        {tasks.map((item) => {
          return (
            <div className={`Tasks-task ${item.completed ? 'completed':''}`} key={item._id}>
                <div className="Task-btn-con">
                    <button value={item._id}
                        onClick={() => { handleUpdateTaskCompleted() }}
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
                    <button className="Task-delete-btn Pointer" value={item._id} onClick={handleDeleteTask}>X</button>
                </div>
            </div>
          )
        }
      )
    }
    </div>
  )
}
export default CompletedTasks
