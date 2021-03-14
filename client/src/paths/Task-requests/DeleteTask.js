import axios from 'axios'

const deleteTask = async (id) =>{
  let res = await axios.delete(`/tasks/${id}`)
  console.log(res.data)
    // const response = await fetch(`/tasks/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    // await response.json()
}
export {
    deleteTask
}
