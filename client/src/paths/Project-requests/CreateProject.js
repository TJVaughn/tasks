const createProject = async (title) => {
    const data = {
        "title": title
    }
    const response = await fetch('/projects', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const body = await response.json()
    return body
}   

export { createProject }