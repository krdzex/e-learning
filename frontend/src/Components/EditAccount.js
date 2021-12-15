import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import { updateUser, userInfo } from '../ApiService/userApi';
import EditProfileNavigation from './EditProfileNavigation';
import Menu from './Menu';

const EditAccount = () => {
    let location = useLocation()
    const { userId } = useParams()
    const [originalActive, setOriginalActive] = useState("")
    const [originalRole, setOriginalRole] = useState("")
    let currentLook = location.pathname.split("/")[1]
    useEffect(() => {
        (async function () {
            let userInformation = await userInfo(userId)
            setOriginalRole(userInformation.role)
            setOriginalActive(userInformation.active)
            setValues({
                ...values,
                firstName: userInformation.firstName,
                lastName: userInformation.lastName,
                email: userInformation.email,
                role: userInformation.role,
                active: userInformation.active,
                img: userInformation.img
            })
        }())
    }, [userId])
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        img: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        active: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("img", values.img)
        formData.append("firstName", values.firstName)
        formData.append("lastName", values.lastName)
        formData.append("email", values.email)
        formData.append("role", values.role)
        formData.append("active", values.active)

        updateUser(userId, formData).then(response => {
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


    const onReleaseActive = () => {
        if (values.active === "") {
            setValues({ ...values, active: originalActive })
        }
    }
    const onReleaseRole = () => {
        if (values.role === "") {
            setValues({ ...values, role: originalRole })
        }
    }

    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }

    if (values.redirect) return <Navigate to={"/dashboard/users"} />
    return (
        <div className="editAccountWrapper">
            <Menu />
            <div className="mainContent middle">
                {currentLook !== "user" && (<EditProfileNavigation />)}
                <div className="editAccount">
                    <div className="card" id="card">
                        <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                            <h3>Edit Account</h3>
                            <div className={values.img === "" ? "inputBox" : "inputBox active"}>
                                <input type="file" name="img" className="addFile" onChange={onChangeFile} />
                                <span>Image</span>
                            </div>
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
                            {currentLook === "user" && (<div className={values.role === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" list="role" onMouseDown={() => setValues({ ...values, role: "" })} className={errors.role ? "error" : "success"} value={values.role} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("role")} onBlur={() => onReleaseRole()} />
                                <span>Role</span>
                                <datalist id="role">
                                    <option value="Admin" />
                                    <option value="Mentor" />
                                    <option value="Student" />
                                </datalist>
                            </div>)}
                            {currentLook === "user" && (<div className={values.active === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" list="active" onMouseDown={() => setValues({ ...values, active: "" })} className={errors.active ? "error" : "success"} value={values.active} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("active")} onBlur={() => onReleaseActive()} />
                                <span>Is Active</span>
                                <datalist id="active">
                                    <option value="false" />
                                    <option value="true" />
                                </datalist>
                            </div>)}
                            <div className="buttons">
                                <input type="submit" value="Update" />
                                {currentLook === "user" && (<Link to="/dashboard/users" className="cancelButton"> <div className="button">
                                    Cancel Edit
                                </div> </Link>)}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;