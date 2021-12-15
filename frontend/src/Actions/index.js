
export const logIn = () => {
    return {
        type: "LOGGED_IN"
    }
}

export const changeUserFilter = (user) => {
    return {
        type: "CHANGE_USER_FILTER",
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    }
}

export const changeCourseFilter = (course) => {
    return {
        type: "CHANGE_COURSE_FILTER",
        titleName: course.titleName,
        mentorName: course.mentorName,
        level: course.level,
        duration: course.duration,
    }
}
export const editNavigation = (current) => {
    return {
        type: "CHANGE_EDIT_NAVIGATION",
        payload: current
    }
}
export const changeNumber = (number) => {
    return {
        type: "REAL_NUMBER",
        payload: number
    }
}

export const changeTextInput = (text) => {
    return {
        type: "SEARCH_TEXT",
        payload: text
    }
}

export const addLevelFilter = (filter) => {
    return {
        type: "ADD_LEVEL_FILTER",
        payload: filter
    }
}

export const addDurationFilter = (duration) => {
    return {
        type: "ADD_DURATION_FILTER",
        payload: duration
    }
}



export const uncompletedCourses = (courses) => {
    return {
        type: "ADD_UNCOMPLETED_COURSES",
        payload: courses
    }
}

