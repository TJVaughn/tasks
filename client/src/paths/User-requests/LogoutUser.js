const logoutUser = async () => {
    await fetch('/users/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        redirect: 'follow'
    })
}
const logoutUserFromAll = async () => {
    await fetch('/users/logout-all', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        redirect: 'follow'
    })
}
export { logoutUser, logoutUserFromAll }