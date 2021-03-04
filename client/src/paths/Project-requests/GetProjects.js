const getAllProjects = async () => {
    const response = await fetch('/projects', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    // console.log(body)
    // if(typeof body !== Array){
    //     return []
    // }
    return body
}
const getProjectById = async (id) => {
    const response = await fetch(`/projects/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    return body
}
export {
    getAllProjects,
    getProjectById
}