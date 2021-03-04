const updateProject = async (id, title) => {
    const data = {
        "title": title
    }
    const response = await fetch(`/projects/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    const body = await response.json()
    return body
}

export { updateProject }