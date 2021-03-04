// import { getCookie} from '../../utils/cookies'
// const currentProjectID = getCookie("currProjectID")
// console.log(currentProjectID)

const createTask = async (input, projectID) => {
    const data = {
        "description": input,
        "project": projectID
    }
    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    await response.json()
}
export { createTask }
