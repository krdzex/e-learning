const editNavigationReducer = (state = "1", action) => {
    switch (action.type) {
        case "CHANGE_EDIT_NAVIGATION":
            return state = action.payload
        default:
            return state;
    }
}
export default editNavigationReducer;