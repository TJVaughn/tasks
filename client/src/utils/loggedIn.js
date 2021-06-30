import { getCookie } from "./cookies"

export default function loggedIn(){
    if(getCookie('isLoggedIn') === 'true'){
        return true
    }
    return false
}
