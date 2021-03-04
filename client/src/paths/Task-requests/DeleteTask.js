const deleteTask = async (id) =>{
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    await response.json()
}
export {
    deleteTask
}