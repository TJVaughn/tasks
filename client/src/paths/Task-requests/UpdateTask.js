import { getTaskById } from './GetTaskById'

const setTaskToTrue = async (id) => {
    const data = {
        "completed": true
    }
    const response = await fetch(`/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    await response.json()
    // console.log(body)
}
const setTaskToFalse = async (id) => {
    const data = {
        "completed": false
    }
    const response = await fetch(`/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    await response.json()
    // console.log(body)
}

const updateTask = async (id) => {
    const task = await getTaskById(id)
    // console.log(task)
    if(!task.completed){
        return await setTaskToTrue(id)
    }
    return await setTaskToFalse(id)
}
export { updateTask }