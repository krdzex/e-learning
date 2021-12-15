import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const StudentRoutes = () => {
    if (authHelper.isAuthentcated().role === "Student") {
        return <Outlet />
    } else {
        if (authHelper.isAuthentcated().role === "Mentor") {
            return <Navigate replace to="/mentorDashboard" />
        }
        return <Navigate replace to="/dashboard/users" />
    }
}

export default StudentRoutes