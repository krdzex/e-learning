const filterCourseReducer = (state = { titleName: "", mentorName: "", level: "All Levels", duration: "" }, action) => {
    switch (action.type) {
        case "CHANGE_COURSE_FILTER":
            return { ...state, titleName: action.titleName, mentorName: action.mentorName, level: action.level, duration: action.duration }
        default:
            return state;
    }
}
export default filterCourseReducer;