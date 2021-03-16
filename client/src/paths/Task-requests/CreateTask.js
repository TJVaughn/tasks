// import { getCookie} from '../../utils/cookies'
// const currentProjectID = getCookie("currProjectID")
// console.log(currentProjectID)
import axios from 'axios'

const createTask = async (description, project, category) => {
    const data = {
        description,
        project,
        category
    }
    let res = await axios.post(`/tasks`, data)
    console.log(res.data)
}
export { createTask }
