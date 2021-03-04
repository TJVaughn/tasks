const updateUserName = async (name) => {
    const data = {
        "name": name
    }
    const response = await fetch('/users/me', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const body = await response.json()
    return body
}
const checkOldPass = async (email, pass) => {
    const data = {
        "email": email,
        "password": pass
    }
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const body = await response.json()
    // console.log(body.error)
    if(body.error){
        return false
    }
    return true
}

const createNewPass = async (pass) => {
    const data = {
        "password": pass
    }
    const response = await fetch('/users/me', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const body = await response.json()
    return body
}
export {
    updateUserName,
    checkOldPass,
    createNewPass
}