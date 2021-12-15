import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import CoursesTable from './CoursesTable';
import Filter from './Filter';
import Menu from './Menu';
import UserTable from './UserTable';

const AdminDashboard = () => {

    let location = useLocation()
    let currentLook = location.pathname.split("/")[2]

    return (
        <div className="dashboardWrapper">
            <Menu />
            <div className="mainContent">
                <div className="dashboard">
                    <div className="dashboardHeader">
                        <div className="dhleft">
                            {currentLook === "users" ? "All Users" : "All Courses"}
                        </div>
                        {currentLook === "users" ? <Link to="/addUser" ><div className="dhright">
                            Add User
                        </div></Link> : <Link to="/addCourse"><div className="dhright">
                            Add Course
                        </div></Link>}
                    </div>
                    <Filter />
                    {currentLook === "users" ? <UserTable /> : <CoursesTable />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;