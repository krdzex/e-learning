import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const MentorRoutes = () => {
    if (authHelper.isAuthentcated().role === "Mentor") {
        return <Outlet />
    } else {
        if (authHelper.isAuthentcated().role === "Student") {
            return <Navigate replace to="/studentDashboard" />
        }
        return <Navigate replace to="/dashboard/users" />
    }
}

export default MentorRoutes