import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editNavigation } from '../Actions';
import authHelper from '../Auth/authHelper';

const EditProfileNavigation = () => {
    const dispatch = useDispatch()
    const classInfo = useSelector(state => state.editNavigationReducer)
    return (
        <div className="editNavigation">
            <Link to={`/editProfile/info/${authHelper.isAuthentcated()._id}`}><div className={classInfo === "1" ? "activeEdit" : ""} onClick={() => dispatch(editNavigation("1"))}>
                Edit Account Informations
            </div></Link>
            <Link to={`/editProfile/password/${authHelper.isAuthentcated()._id}`}><div className={classInfo === "2" ? "activeEdit" : ""} onClick={() => dispatch(editNavigation("2"))}>
                Edit Password
            </div></Link>
            <Link to={`/editProfile/delete/${authHelper.isAuthentcated()._id}`}> <div className={classInfo === "3" ? "activeEdit" : ""} onClick={() => dispatch(editNavigation("3"))}>
                Delete Account
            </div></Link>
        </div>
    );
};

export default EditProfileNavigation;