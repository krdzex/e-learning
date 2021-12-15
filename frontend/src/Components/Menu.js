import React, { useEffect, useState } from 'react';
import authHelper from '../Auth/authHelper';
import { Icon } from "@iconify/react"
import { Link } from 'react-router-dom';
import CoursesCounter from './CoursesCounter';

const Menu = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(authHelper.isAuthentcated())
    }, [])

    return (
        <div className="menuWrapper">
            <div className="img">
                <img src={process.env.PUBLIC_URL + `/images/${user.img}`} alt="img" />
            </div>
            <h2> {user.role === "Mentor" ? user.firstName + " " + user.lastName : user.firstName}</h2>
            <div className="menuNavigation">
                <ul>
                    {user.role === "Admin" && (<Link to="/dashboard/users" style={{ textDecoration: "none" }}><li><div><Icon icon="fa-solid:users" className="realIcon" /></div><div>Users</div></li></Link>)}
                    {user.role === "Admin" && (<Link to="/dashboard/courses" style={{ textDecoration: "none" }}> <li><div><Icon icon="akar-icons:book" className="realIcon" /></div><div>Courses</div></li></Link>)}
                    {user.role !== "Admin" && (<Link to={user.role === "Mentor" ? "/mentorDashboard" : "/studentDashboard"} style={{ textDecoration: "none" }}> <li><div><Icon icon="akar-icons:book" className="realIcon" /></div><div>Dashboard</div></li></Link>)}
                    <Link to={`/editProfile/info/${user._id}`} style={{ textDecoration: "none" }}> <li><div><Icon icon="fa-solid:user-edit" className="realIcon" /></div><div>Edit profile</div></li></Link>
                    <li onClick={() => { authHelper.signOut(); window.location.reload() }}><div><Icon icon="ant-design:logout-outlined" className="realIcon" /></div><div>Log out</div></li>
                </ul >
                {user.role === "Student" && (
                    <CoursesCounter />
                )}
            </div >
        </div >
    );
};

export default Menu;