import React, { useCallback, useEffect, useState } from 'react';
import { completeCourse, listEnrolledCourses } from '../ApiService/courseApi';
import authHelper from '../Auth/authHelper';
import { userInfo } from "../ApiService/userApi"
import { useDispatch } from 'react-redux';
import { uncompletedCourses } from '../Actions';
const EnrolledCourses = () => {

    const dispatch = useDispatch()
    const [courses, setCourses] = useState([])

    const getData = useCallback(async () => {
        let data = await listEnrolledCourses(authHelper.isAuthentcated()._id)
        for (let i = 0; i < data.length; i++) {
            let authorName = await userInfo(data[i].author)
            data[i].author = authorName.firstName
        }
        dispatch(uncompletedCourses(data))
        setCourses(data)
    },[dispatch])

    useEffect(() => {
        getData()
    }, [getData])

    const onCompleteClick = async (course) => {
        for (let i = 0; i < course.students.length; i++) {
            if (course.students[i].student === authHelper.isAuthentcated()._id) {
                let result = await completeCourse(course._id, course.students[i]._id);
                console.log(result)
                break;
            }
        }
        let newCourses = courses.filter(thisCourse => thisCourse._id !== course._id)
        setCourses(newCourses)
    }
    useEffect(() => {
        dispatch(uncompletedCourses(courses))
    }, [courses,dispatch])

    return (
        <div className='enrolledWrapper'>
            {courses.map((course, id) => (
                <div className='enrolledCard' key={id}>
                    <div className='img'>
                        <img src={process.env.PUBLIC_URL + `/images/${course.img}`} alt="img" />
                    </div>
                    <h2>
                        {course.title}
                    </h2>
                    <p>
                        Mentor Name: {course.author}
                    </p>
                    <div className='chackBox'><input type="checkbox" checked={false} onClick={() => onCompleteClick(course)} readOnly={true} /> Completed</div>
                </div>
            ))}
        </div>
    );
};

export default EnrolledCourses;