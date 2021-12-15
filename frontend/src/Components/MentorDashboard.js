import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import MyCourses from './MyCourses';

const MentorDashboard = () => {
    const noOfProjecs = useSelector(state => state.noOfMyProjectsReducer)
    return (
        <div className="dashboardWrapper">
            <Menu />
            <div className="mainContent">
                <div className="dashboard">
                    <div className="dashboardHeader">
                        <div className="dhleft">
                            My Courses: {noOfProjecs}
                        </div>
                        <Link to="/addCourse"><div className="dhright">
                            Add Course
                        </div></Link>
                    </div>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <MyCourses />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;