const deleteProject = async (id) => {
    const response = await fetch(`/projects/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    return body
}

export { deleteProject }