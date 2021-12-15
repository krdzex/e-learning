const searchFilterReducer = (state = { duration: "", level: "All Levels" }, action) => {
    switch (action.type) {
        case "ADD_LEVEL_FILTER":
            return { ...state, level: action.payload }

        case "ADD_DURATION_FILTER":
            return { ...state, duration: action.payload }

        default:
            return state;
    }
}
export default searchFilterReducer;