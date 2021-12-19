import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createUser = (user) => {
    return fetch(`${url}/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const userInfo = (id) => {
    return fetch(`${url}/user/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const listUsers = () => {
    return fetch(`${url}/users`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateUser = (id, user) => {
    return fetch(`${url}/user/${id}`, {
        method: "PUT",
        body: user
    }).then(response => response.json()).catch(err => console.log(err))
}

const updatePassword = (id, user) => {
    return fetch(`${url}/user/password/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}



const deleteUser = (id,data) => {
    return fetch(`${url}/user/delete/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}


export { createUser, userInfo, listUsers, updateUser, deleteUser, updatePassword }