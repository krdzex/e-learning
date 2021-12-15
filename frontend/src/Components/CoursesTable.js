import { Icon } from '@iconify/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCourse, listCourses } from '../ApiService/courseApi';
import { userInfo } from '../ApiService/userApi';


const CoursesTable = () => {


    const values = useSelector(state => state.filterCourseReducer);
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])
    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = async () => {
        let allCourses = await listCourses()
        for (let i = 0; i < allCourses.length; i++) {
            let mentorInfo = await userInfo(allCourses[i].author);
            allCourses[i].author = mentorInfo.firstName + " " + mentorInfo.lastName
        }
        setCourses(allCourses)
        setFilteredCourses(allCourses)
    }

    const filterByLevel = useCallback((array) => {
        if (values.level === "" || values.level === "All Levels") {
            return array
        } else {
            return array.filter(arr => arr.level === values.level)
        }
    },[values.level])
    const filterByMentorOrTitle = useCallback((array) => {
        if (values.titleName !== "") {
            if (values.titleName === "A-Z") {
                return array.sort((a, b) => a.title.localeCompare(b.title))
            } else {
                return array.sort((a, b) => a.title.localeCompare(b.title)).reverse()
            }
        } else if (values.mentorName !== "") {
            if (values.mentorName === "A-Z") {
                return array.sort((a, b) => a.author.localeCompare(b.author))
            } else {
                return array.sort((a, b) => a.author.localeCompare(b.author)).reverse()
            }
        } else {
            return array
        }
    }, [values.mentorName, values.titleName])

    const filterByDuration = useCallback((array) => {
        if (values.duration === "") {
            return array
        } else {
            return array.filter(arr => arr.duration === values.duration)
        }
    }, [values.duration])


    useEffect(() => {
        let coursesCopy = courses.slice()
        coursesCopy = filterByLevel(coursesCopy)
        coursesCopy = filterByDuration(coursesCopy)
        coursesCopy = filterByMentorOrTitle(coursesCopy)
        setFilteredCourses(coursesCopy)
    }, [values, courses, filterByDuration, filterByLevel, filterByMentorOrTitle])



    const onDeleteClick = async (id) => {
        let newCourses = courses.filter(course => course._id !== id);
        setCourses(newCourses)
        await deleteCourse(id);
    }



    return (
        <div className="table">
            <table>
                <tbody>
                    {filteredCourses.map((course, id) => (
                        <tr key={id}>
                            <td>
                                <img src={process.env.PUBLIC_URL + `/images/${course.img}`} alt="img" />
                            </td>
                            <td>
                                {course.title}
                            </td>
                            <td>
                                {course.author}
                            </td>
                            <td>
                                {course.description}
                            </td>
                            <td>
                                {course.level}
                            </td>
                            <td>
                                {course.duration}
                            </td>
                            <td>
                                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Link to={`/course/${course._id}`} ><Icon icon="ci:edit" className="realIcon" style={{ color: "blue" }} /></Link>
                                    <Icon icon="fluent:delete-48-filled" className="realIcon" style={{ color: "red" }} onClick={() => onDeleteClick(course._id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoursesTable;