const getAllCompletedTasks = async (id) => {
    const response = await fetch(`/tasks?completed=true&sort=createdAt:asc&project=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    // console.log("Completed: ", body)
    console.log(body)
    if(typeof body != 'object'){
        console.log('error')
    }
    return body
}
const getAllIncompleteTasks = async (id) =>{
    const response = await fetch(`/tasks?completed=false&sort=createdAt:asc&project=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    // console.log("Incomplete", body)
    if(typeof body != 'object'){
        console.log('error')
    }
    if(body.error){
        return []
    }
    console.log(body)
    return body
}
const getAllTasks = async (id) => {
    let completed = await getAllCompletedTasks(id);
    let incomplete = await getAllIncompleteTasks(id)
    if(completed.error || incomplete.error){
        return []
    }
    incomplete.forEach(item => {
        completed.push(item)
    })
    completed.reverse()
    // console.log("Whole thing: ", array)
    return completed
}
export {
    getAllCompletedTasks,
    getAllIncompleteTasks, 
    getAllTasks
}