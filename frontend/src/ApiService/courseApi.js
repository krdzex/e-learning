import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createCourse = (course) => {
    return fetch(`${url}/course`, {
        method: "POST",
        body: course
    }).then(response => response.json()).catch(err => console.log(err))
}



const listCourses = () => {
    return fetch(`${url}/course`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}


const listMyCourses = (userId) => {
    return fetch(`${url}/courses/user/${userId}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateCourse = (id, user) => {
    return fetch(`${url}/course/${id}`, {
        method: "PUT",
        body: user
    }).then(response => response.json()).catch(err => console.log(err))
}

const courseInfo = (id) => {
    return fetch(`${url}/course/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const deleteCourse = (id) => {
    return fetch(`${url}/course/delete/${id}`, {
        method: "PUT",
    }).then(response => response.json()).catch(err => console.log(err))
}

const listCoursesByTitle = (input) => {
    return fetch(`${url}/courses/title/${input}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const enrollStudentOnCourse = (id, userId) => {
    return fetch(`${url}/courses/enroll/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ userId: userId })
    }).then(response => response.json()).catch(err => console.log(err))
}

const listEnrolledCourses = (id) => {
    return fetch(`${url}/courses/enrollList/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const completeCourse = (id, enrollId) => {
    return fetch(`${url}/courses/complete/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ enrollId: enrollId })
    }).then(response => response.json()).catch(err => console.log(err))
}

const noOfCompletedCourses = (id) => {
    return fetch(`${url}/courses/complete/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}









export { createCourse, listCourses, deleteCourse, courseInfo, updateCourse, listMyCourses, listCoursesByTitle, enrollStudentOnCourse, listEnrolledCourses, completeCourse,noOfCompletedCourses }