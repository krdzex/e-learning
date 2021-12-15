import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { changeCourseFilter, changeUserFilter } from '../Actions';

const Filter = () => {

    let location = useLocation()
    let currentLook = location.pathname.split("/")[2]


    const values = useSelector(state => state.filterUserReducer);
    const valuesCourses = useSelector(state => state.filterCourseReducer);
    const dispatch = useDispatch()

    const onChangeFirstName = event => {
        dispatch(changeUserFilter({
            ...values,
            firstName: event.target.value,
            lastName: ""
        }))
    }
    const onChangeLastName = event => {
        dispatch(changeUserFilter({
            ...values,
            firstName: "",
            lastName: event.target.value,
        }))
    }
    const onChangeRole = event => {
        dispatch(changeUserFilter({
            ...values,
            role: event.target.value
        }))
    }

    const onChangeMentorName = event => {
        dispatch(changeCourseFilter({
            ...valuesCourses,
            titleName: "",
            mentorName: event.target.value,
        }))
    }

    const onReleaseRole = () => {
        if (values.role === "") {
            dispatch(changeUserFilter({
                ...values,
                role: "All"
            }))
        }
    }

    const onChangeTitleName = event => {
        dispatch(changeCourseFilter({
            ...valuesCourses,
            titleName: event.target.value,
            mentorName: "",
        }))
    }

    const onChangeGeneral = name => event => {
        dispatch(changeCourseFilter({
            ...valuesCourses,
            [name]: event.target.value,
        }))
    }

    const onReleaseLevels = () => {
        if (valuesCourses.level === "") {
            dispatch(changeCourseFilter({
                ...valuesCourses,
                level: "All Levels"
            }))
        }
    }


    return (
        <div className="filterWrapper">
            <div className="titleSpan">
                Filter
            </div>
            <div className={currentLook === "users" ? "filtersUsers" : "filtersCourses"}>
                {currentLook === "users" ? <div>
                    <input type="text" list="firstName" placeholder="By First name" onMouseDown={() => dispatch(changeUserFilter({ ...values, firstName: "" }))} value={values.firstName} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeFirstName} />
                    <datalist id="firstName">
                        <option value="A-Z" />
                        <option value="Z-A" />
                    </datalist>
                </div> : <div>
                    <input type="text" list="titleName" placeholder="By Title name" onMouseDown={() => dispatch(changeCourseFilter({ ...valuesCourses, titleName: "" }))} value={valuesCourses.titleName} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeTitleName} />
                    <datalist id="titleName">
                        <option value="A-Z" />
                        <option value="Z-A" />
                    </datalist>
                </div>}
                {currentLook === "users" ? <div>
                    <input type="text" list="lastName" placeholder="By last name" onMouseDown={() => dispatch(changeUserFilter({ ...values, lastName: "" }))} value={values.lastName} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeLastName} />
                    <datalist id="lastName">
                        <option value="A-Z" />
                        <option value="Z-A" />

                    </datalist>
                </div> : <div>
                    <input type="text" list="mentorName" placeholder="By mentor name" onMouseDown={() => dispatch(changeCourseFilter({ ...valuesCourses, mentorName: "" }))} value={valuesCourses.mentorName} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeMentorName} />
                    <datalist id="mentorName">
                        <option value="A-Z" />
                        <option value="Z-A" />
                    </datalist>
                </div>}
                {currentLook === "courses" && (<div>
                    <input type="text" list="levels" placeholder="By level" onMouseDown={() => dispatch(changeCourseFilter({ ...valuesCourses, level: "" }))} value={valuesCourses.level} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeGeneral("level")} onBlur={() => onReleaseLevels()}/>
                    <datalist id="levels">
                        <option value="Beginner Level" />
                        <option value="Intermediate Level" />
                        <option value="Advanced Level" />
                        <option value="All Levels" />
                    </datalist>
                </div>)}
                {currentLook === "users" ? <div>
                    <input type="text" list="role" onMouseDown={() => dispatch(changeUserFilter({ ...values, role: "" }))} value={values.role} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeRole} onBlur={() => onReleaseRole()} />
                    <datalist id="role">
                        <option value="All" />
                        <option value="Mentor" />
                        <option value="Student" />
                    </datalist>
                </div> : <div>
                    <input type="text" list="duration" placeholder="By Duration" onMouseDown={() => dispatch(changeCourseFilter({ ...valuesCourses, duration: "" }))} value={valuesCourses.duration} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChangeGeneral("duration")} />
                    <datalist id="duration">
                        <option value="0-3 Hours" />
                        <option value="3-6 Hours" />
                        <option value="6-12 Hours" />
                        <option value="1-2 Days" />
                        <option value="2-5 Days" />
                        <option value="5-15 Days" />
                    </datalist>
                </div>}
            </div>
        </div>
    );
};

export default Filter;