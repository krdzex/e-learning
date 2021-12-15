const filterUserReducer = (state = { firstName: "", lastName: "", role: "All" }, action) => {
    switch (action.type) {
        case "CHANGE_USER_FILTER":
            return { ...state, firstName: action.firstName, lastName: action.lastName, role: action.role }
        default:
            return state;
    }
}
export default filterUserReducer;