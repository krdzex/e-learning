import { Icon } from '@iconify/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { courseInfo, enrollStudentOnCourse, listCoursesByTitle } from '../ApiService/courseApi';
import authHelper from '../Auth/authHelper';
import SearchFilter from './SearchFilter';


const SearchCourses = () => {

    const navigate = useNavigate()
    const filters = useSelector(state => state.searchFilterReducer)
    const input = useSelector(state => state.searchReducer)
    const [originalCourses, setOriginalCourses] = useState([])
    const [filtreredCourses, setFiltreredCourses] = useState([])
    useEffect(() => {
        if (input !== "") {
            listCoursesByTitle(input).then(res => {
                setOriginalCourses(res);
                setFiltreredCourses(res);
            }).catch(err => console.log(err))
        } else {
            navigate(authHelper.isAuthentcated().role === "Admin" ? "/dashboard/users" : authHelper.isAuthentcated().role === "Mentor" ? "/mentorDashboard" : "/studentDashboard")
        }
    }, [input, navigate])



    const filterByLevel = useCallback((array) => {
        if (filters.level === "" || filters.level === "All Levels") {
            return array
        } else {
            return array.filter(arr => arr.level.split(" ")[0] === filters.level)
        }
    }, [filters.level])


    const filterByDuration = useCallback((array) => {
        if (filters.duration === "") {
            return array
        } else {
            return array.filter(arr => arr.duration === filters.duration)
        }
    }, [filters.duration])

    useEffect(() => {
        let searchedCoursesCopy = originalCourses.slice();
        searchedCoursesCopy = filterByLevel(searchedCoursesCopy)
        searchedCoursesCopy = filterByDuration(searchedCoursesCopy)
        setFiltreredCourses(searchedCoursesCopy)
    }, [filters, filterByDuration, filterByLevel, originalCourses])


    const [isActive, setIsActive] = useState("")

    const onHover = (id) => {
        setIsActive(id)
    }

    const onOutHover = () => {
        setIsActive("")
    }

    const enrollStudent = async (id) => {
        let originalCoursesCopy = originalCourses.slice()
        await enrollStudentOnCourse(id, authHelper.isAuthentcated()._id)
        
        for (let i = 0; i < originalCoursesCopy.length; i++) {
            if (originalCoursesCopy[i]._id === id) {
                originalCoursesCopy[i] = await courseInfo(id)
            }
        }
        setOriginalCourses(originalCoursesCopy)
    }

    const isEnrollerd = (allEnrols) => {
        for (let i = 0; i < allEnrols.length; i++) {
            if (allEnrols[i].student === authHelper.isAuthentcated()._id) {
                return true;
            }
        }
        return false
    }

    return (
        <div>
            <SearchFilter />
            <div className="coursesResultWrapper">
                <h1 style={{ textAlign: "center", wordBreak: "break-all" }}>{input} courses: {originalCourses.length} courses</h1>
                <div className="myCourses search">
                    {filtreredCourses.map((course, id) => (
                        <div className="courseCard" key={id} onMouseEnter={() => onHover(id)} onMouseLeave={() => onOutHover()}>
                            <div className="cardImage">
                                <img src={process.env.PUBLIC_URL + `/images/${course.img}`} alt="img" />
                            </div>
                            <div className="courseInfoCard">
                                <div className="infoSpan"><h3>Course Title:</h3><span>{course.title}</span></div>
                                <div className="infoSpan description"><h3>Course Description:</h3><span>{course.description}</span></div>
                                <div className="infoSpan"><h3>Course Level:</h3><span>{course.level}</span></div>
                                <div className="infoSpan"><h3>Course Duration:</h3><span>{course.duration}</span></div>
                            </div>
                            <div className={isActive === id ? "popUpModel active" : 'popUpModel'}>
                                <h2>What will you learn:</h2>
                                <div className='learnTask'>
                                    <div>
                                        <Icon icon="icon-park-outline:check-correct" className='learnTaskIcon' />
                                    </div>
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    </div>
                                </div>
                                <div className='learnTask'>
                                    <div>
                                        <Icon icon="icon-park-outline:check-correct" className='learnTaskIcon' />
                                    </div>
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    </div>
                                </div>
                                <div className='learnTask'>
                                    <div>
                                        <Icon icon="icon-park-outline:check-correct" className='learnTaskIcon' />
                                    </div>
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    </div>
                                </div>
                                {authHelper.isAuthentcated().role === "Student" && !isEnrollerd(course.students) && (<div className='enrollButton' onClick={() => enrollStudent(course._id)}>
                                    Enroll to Course
                                </div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchCourses;