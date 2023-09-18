import {redirect} from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration')
    const expirationDate = new Date(storedExpirationDate)
    return expirationDate.getTime() - new Date().getTime()
}
export function getAuthToken() {
    const token = localStorage.getItem('token')
    const duration = getTokenDuration()
    if (duration < 0) {
        return null
    }
    return token
}
export function tokenLoader() {
    return getAuthToken()
}
export function checkAuthLoader() {
    const token = getAuthToken()
    if (!token) {
        return redirect('/auth')
    }
    return null
}
