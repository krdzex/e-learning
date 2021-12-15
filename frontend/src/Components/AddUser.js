import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { createUser } from '../ApiService/userApi';
import Menu from './Menu';

const AddUser = () => {


    
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            confirmPassword: values.confirmPassword || undefined
        }
        createUser(user).then(response => {
            if (firstTime) {
                document.getElementById("card").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setValues({ ...values, redirect: true })
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }


    if (values.redirect) return <Navigate to={"/dashboard/users"} />
    return (
        <div className="editAccountWrapper">
            <Menu />
            <div className="mainContent middle">
                <div className="addAccount">
                    <div className="card" id="card">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <h3>Add New Account</h3>
                            <div className={values.firstName === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.firstName ? "error" : "success"} value={values.firstName} onChange={onChange("firstName")} />
                                <span>First name</span>
                                <p>{errors.firstName}</p>
                            </div>
                            <div className={values.lastName === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.lastName ? "error" : "success"} value={values.lastName} onChange={onChange("lastName")} />
                                <span>Last Name</span>
                                <p>{errors.lastName}</p>
                            </div>
                            <div className={values.email === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.email ? "error" : "success"} value={values.email} onChange={onChange("email")} />
                                <span>Email</span>
                                <p>{errors.email}</p>
                            </div>
                            <div className={values.password === "" ? "inputBox last" : "inputBox active last"}>
                                <input type="password" className={errors.password ? "error" : "success"} value={values.password} onChange={onChange("password")} />
                                <span>Password</span>
                                <p>{errors.password}</p>
                            </div>
                            <div className={values.confirmPassword === "" ? "inputBox last" : "inputBox active last"}>
                                <input type="password" className={errors.confirmPassword ? "error" : "success"} value={values.confirmPassword} onChange={onChange("confirmPassword")} />
                                <span>Confirm passwrod</span>
                                <p>{errors.confirmPassword}</p>
                            </div>
                            <div className="buttons">
                                <input type="submit" />
                                <Link to="/dashboard/users" className="cancelButton"> <div className="button">
                                    Go back
                                </div> </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;