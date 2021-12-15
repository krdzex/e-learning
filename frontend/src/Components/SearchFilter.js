
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { addDurationFilter, addLevelFilter } from '../Actions';

const SearchFilter = () => {

    const dispatch = useDispatch()
    const currentValues = useSelector(state => state.searchFilterReducer)


    const onChangeLevels = (e) => {
        if (e.target.checked) {
            dispatch(addLevelFilter(e.target.value))
        } else {
            dispatch(addLevelFilter(""))
        }
    }

    const onChangeDuration = (e) => {
        if (e.target.checked) {
            dispatch(addDurationFilter(e.target.value))
        }
        else {
            dispatch(addDurationFilter(""))
        }
    }


    
    return (
        <div className="searchFilter">

            <ul>
                <li>
                    <h2>
                        <span className="mainTitle">Levels</span>
                    </h2>
                    <div className="subNav">
                        <div>
                            <span><input type="checkbox" value="All Levels" onChange={onChangeLevels} checked={currentValues.level === "All Levels"} /></span>
                            <span className="title">All Levels</span>
                        </div>
                        <div>
                            <span><input type="checkbox" value="Beginner" onChange={onChangeLevels} checked={currentValues.level === "Beginner" } /></span>
                            <span className="title">Beginner</span>

                        </div>
                        <div>
                            <span><input type="checkbox" value="Intermediate" onChange={onChangeLevels} checked={currentValues.level === "Intermediate" } /></span>
                            <span className="title">Intermediate</span>

                        </div>
                        <div>
                            <span><input type="checkbox" value="Advanced" onChange={onChangeLevels} checked={currentValues.level === "Advanced"} /></span>
                            <span className="title">Advanced</span>
                        </div>
                    </div>

                </li>
                <li>
                    <h2>
                        <span className="mainTitle"> Durations</span>
                    </h2>
                    <div className="subNav">
                        <div >
                            <span><input type="checkbox" value="0-3 Hours" onChange={onChangeDuration} checked={currentValues.duration === "0-3 Hours"}/></span>
                            <span className="title">0-3 Hours</span>
                        </div>
                        <div >
                            <span><input type="checkbox" value="3-6 Hours" onChange={onChangeDuration} checked={currentValues.duration === "3-6 Hours"}/></span>
                            <span className="title">3-6 Hours</span>
                           
                        </div>
                        <div >
                            <span><input type="checkbox" value="6-12 Hours" onChange={onChangeDuration} checked={currentValues.duration === "6-12 Hours"}/></span>
                            <span className="title">6-12 Hours</span>
                           
                        </div>
                        <div >
                            <span><input type="checkbox" value="1-2 Days" onChange={onChangeDuration} checked={currentValues.duration === "1-2 Days"}/></span>
                            <span className="title">1-2 Days</span>
                        </div>
                        <div >
                            <span><input type="checkbox" value="2-5 Days" onChange={onChangeDuration} checked={currentValues.duration === "2-5 Days"}/></span>
                            <span className="title">2-5 Days</span>
                        </div>
                        <div >
                            <span><input type="checkbox" value="5-15 Days" onChange={onChangeDuration} checked={currentValues.duration === "5-15 Days"}/></span>
                            <span className="title">5-15 Days</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SearchFilter;