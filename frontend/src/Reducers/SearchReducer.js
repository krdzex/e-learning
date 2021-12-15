const searchReducer = (state = "", action) => {
    switch (action.type) {
        case "SEARCH_TEXT":
            return state = action.payload
        default:
            return state;
    }
}
export default searchReducer;