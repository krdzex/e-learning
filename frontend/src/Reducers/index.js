import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import filterUserReducer from "./FilterUserReducer";
import filterCourseReducer from "./FilterCourseReducer";
import editNavigationReducer from "./EditNavigationReducer";
import noOfMyProjectsReducer from "./noOfMyProjects";
import searchReducer from "./SearchReducer";
import searchFilterReducer from "./SearchFilterReducer";
import courseCounter from "./CoursesCounterReducer";
const allReducers = combineReducers({
    loginReducer,
    filterUserReducer,
    filterCourseReducer,
    editNavigationReducer,
    noOfMyProjectsReducer,
    searchReducer,
    searchFilterReducer,
    courseCounter
})

export default allReducers;

