import React from 'react';
import EnrolledCourses from './EnrolledCourses';
import Menu from './Menu';

const StudentDashboard = () => {
    return (
        <div className="dashboardWrapper">
            <Menu />
            <div className="mainContent">
                <div className="dashboard">
                    <div className="dashboardHeader">
                        <div className="dhleft" style={{width: "100%"}}>
                            Courses - Your Current Courses and Process
                        </div>
                    </div>
                    <EnrolledCourses />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;