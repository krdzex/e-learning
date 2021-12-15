import jwtDecode from "jwt-decode";

const authenticate = (jwt, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
        cb()
    }
}
const isAuthentcated = () => {
    if (typeof window == "undefined") return false;
    let getToken = JSON.parse(sessionStorage.getItem("jwt"))

    if (getToken) {
        let decodeToken = jwtDecode(getToken.token)
        return decodeToken.user
    }
    return false;
}

const signOut = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("jwt")
    }
}

export default { authenticate, isAuthentcated, signOut }