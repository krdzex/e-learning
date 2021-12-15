import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeNumber } from '../Actions';
import { deleteCourse, listMyCourses } from '../ApiService/courseApi';
import authHelper from '../Auth/authHelper';

const MyCourses = () => {

    const dispatch = useDispatch()
    const [myCourses, setMyCourses] = useState([])
    useEffect(() => {
        listMyCourses(authHelper.isAuthentcated()._id)
            .then(res => {
                setMyCourses(res);
                dispatch(changeNumber(res.length))
            }).catch(err => console.log(err))
    }, [dispatch])

    
    const onDeleteClick = async (id) => {
        let newCourses = myCourses.filter(course => course._id !== id);
        setMyCourses(newCourses)
        await deleteCourse(id);
    }



    return (
        <div className="myCourses">
            {myCourses.map((course, id) => (
                <div className="courseCard" key={id}>
                    <div className="cardImage">
                        <img src={process.env.PUBLIC_URL + `/images/${course.img}`} alt="img" />
                    </div>
                    <div className="courseInfoCard">
                        <div className="infoSpan"><h3>Course Title:</h3><span>{course.title}</span></div>
                        <div className="infoSpan description"><h3>Course Description:</h3><span>{course.description}</span></div>
                        <div className="infoSpan"><h3>Course Level:</h3><span>{course.level}</span></div>
                        <div className="infoSpan"><h3>Course Duration:</h3><span>{course.duration}</span></div>
                        <div className="cardActions">
                            <Link to={`/course/${course._id}`} ><Icon icon="ci:edit" className="realIcon" style={{ color: "blue" }} /></Link>
                            <Icon icon="fluent:delete-48-filled" className="realIcon" style={{ color: "red" }} onClick={() => onDeleteClick(course._id)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCourses;