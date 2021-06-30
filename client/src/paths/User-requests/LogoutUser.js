import { setCookie } from "../../utils/cookies"

const logoutUser = async () => {
    await fetch('/users/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        redirect: 'follow'
    })
    setCookie("isLoggedIn", false)
    window.location.reload()

}
const logoutUserFromAll = async () => {
    await fetch('/users/logout-all', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        redirect: 'follow'
    })
    setCookie("isLoggedIn", false)
    window.location.reload()
}
export { logoutUser, logoutUserFromAll }