const courseCounter = (state = [], action) => {
    switch (action.type) {
        case "ADD_UNCOMPLETED_COURSES":
            return state = action.payload
        default:
            return state;
    }
}
export default courseCounter;