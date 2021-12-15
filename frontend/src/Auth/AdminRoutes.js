import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const AdminRoutes = () => {
    if (authHelper.isAuthentcated().role === "Admin") {
        return <Outlet />
    } else {
        if (authHelper.isAuthentcated().role === "Mentor") {
            return <Navigate to="/mentorDashboard" />
        }
        return <Navigate to="/studentDashboard" />
    }
}

export default AdminRoutes