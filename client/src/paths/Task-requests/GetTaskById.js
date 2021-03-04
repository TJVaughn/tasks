const getTaskById = async (id) => {
    const response = await fetch(`/tasks/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    return body;
}
export { getTaskById }