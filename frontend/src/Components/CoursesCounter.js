import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listEnrolledCourses, noOfCompletedCourses } from '../ApiService/courseApi';
import authHelper from '../Auth/authHelper';

const CoursesCounter = () => {
    const unCompletedCourses = useSelector(state => state.courseCounter)
    let [completed, setCompleted] = useState(0)
    let [inProcess, setInProcess] = useState(0)
    useEffect(() => {
        getCounters()
    }, [unCompletedCourses])

    const getCounters = async () => {
        let number = 0;
        let completedNo = await noOfCompletedCourses(authHelper.isAuthentcated()._id)
        let inProcessCourses = await listEnrolledCourses(authHelper.isAuthentcated()._id)
        for (let i = 0; i < inProcessCourses.length; i++) {
            for (let j = 0; j < inProcessCourses[i].students.length; j++) {
                if (inProcessCourses[i].students[j].student.toString() === authHelper.isAuthentcated()._id && inProcessCourses[i].students[j].status === "In progress") {
                    number++;
                }
            }
        }
        setCompleted(completedNo.number)
        setInProcess(number)
    }
    return (
        <div className='studentInfo'>
            <h2>
                Completed courses: {completed}
            </h2>
            <h2>
                Courses in progress: {inProcess}
            </h2>
        </div>
    );
};

export default CoursesCounter;