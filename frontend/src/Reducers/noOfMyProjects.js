const noOfMyProjectsReducer = (state = 0, action) => {
    switch (action.type) {
        case "REAL_NUMBER":
            return state = action.payload
        default:
            return state;
    }
}
export default noOfMyProjectsReducer;