
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { changeTextInput } from '../Actions';
import authHelper from '../Auth/authHelper';



const Header = () => {

    let navigate = useNavigate();
    const location = useLocation()
    const logged = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(changeTextInput(text))
        if (text !== "") {
            navigate("/search", { from: location });
        } else {
            navigate(authHelper.isAuthentcated().role === "Admin" ? "/dashboard/users" : authHelper.isAuthentcated().role === "Mentor" ? "/mentorDashboard" : "/studentDashboard")
        }
    }
    return (
        <div className="headerWrapper">
            <div className="headerTitle" onClick={() => {
                navigate(authHelper.isAuthentcated() ? authHelper.isAuthentcated().role === "Admin" ? "/dashboard/users" : authHelper.isAuthentcated().role === "Mentor" ? "/mentorDashboard" : "/studentDashboard" : "")
            }}>
                E-Learning webiste
            </div>
            <form onSubmit={(event) => onSubmit(event)} style={{ width: "100%" }}>
                <div className="search">
                    <input type="text" placeholder="Search course" value={text} onChange={onChange} />
                </div>
            </form>

            {authHelper.isAuthentcated() || logged ? "" : <div className="registrationNavigation">
                <Link to="/signIn"><div className="signIn">
                    Sign In
                </div></Link>
                <Link to="/signUp"><div className="signUp">
                    Sign Up
                </div></Link>
            </div>}
        </div>
    );
};

export default Header;