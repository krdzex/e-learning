import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const AuthorizationRoute = () => {

    const [state, setState] = useState('loading');
    const { userId } = useParams();
    useEffect(() => {
        (async function () {
            try {
                if (authHelper.isAuthentcated()._id.toString() === userId){
                    setState(true);
                }else{
                    setState(false)
                }
            }
            catch {
                setState(false);
            }
        })();
    }, [userId]);

    if (state === 'loading') {
        return null
    }
    return state ? <Outlet /> : authHelper.isAuthentcated().role === "Mentor" ? <Navigate to="/mentorDashboard" /> : <Navigate to="/studentDashboard" />
}

export default AuthorizationRoute