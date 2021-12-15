import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../Actions';
import { signin } from '../Auth/authApi';
import authHelper from '../Auth/authHelper';
import jwt_decode from "jwt-decode";

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email: "",
        password: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        signin(user).then(response => {
            if (firstTime) {
                document.getElementById("signInForm").className += " afterFirst"
                setFirstTime(false)
            }
            if (!response.email && !response.active) {
                dispatch(logIn())
                let decodeInfo = jwt_decode(response.token)

                authHelper.authenticate(response, () => {
                    setErrors({})
                    setValues({ ...values, redirect: true })
                })
                navigate(decodeInfo.user.role === "Admin" ? "/dashboard/users" : decodeInfo.user.role === "Mentor" ? "/mentorDashboard" : "/studentDashboard")
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }


    return (
        <div className="registrationWrapper">
            <div className="card" id="signInForm">
                <form onSubmit={(e) => onSubmit(e)}>
                    <h3>Sign In</h3>
                    <div className={values.email === "" ? "inputBox" : "inputBox active"}>
                        <input type="text" className={errors.email ? "error" : "success"} value={values.email} onChange={onChange("email")} />
                        <span>Email</span>
                        <p>{errors.email}</p>
                    </div>
                    <div className={values.password === "" ? "inputBox last" : "inputBox active last"}>
                        <input type="password" className={errors.password ? "error" : "success"} value={values.password} onChange={onChange("password")} />
                        <span>Password</span>
                        <p>{errors.password}</p>
                        <p>{errors.active}</p>
                    </div>
                    <div className="buttons">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;