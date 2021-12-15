import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const AdminAndMentorRoutes = () => {
    if (authHelper.isAuthentcated().role === "Admin" || authHelper.isAuthentcated().role === "Mentor") {
        return <Outlet />
    }
    return <Navigate to="/studentDashboard" />
}

export default AdminAndMentorRoutes