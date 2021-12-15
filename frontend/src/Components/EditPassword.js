import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { editNavigation } from '../Actions';
import { updatePassword } from '../ApiService/userApi';
import EditProfileNavigation from './EditProfileNavigation';
import Menu from './Menu';

const EditPassword = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(editNavigation("2"))
    }, [dispatch])
    const { userId } = useParams()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
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
            oldPassword: values.oldPassword || undefined,
            newPassword: values.newPassword || undefined,
            confirmPassword: values.confirmPassword || undefined
        }
        updatePassword(userId, user).then(response => {
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
                <EditProfileNavigation />
                <div className="addAccount">
                    <div className="card" id="card">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <h3>Change password</h3>
                            <div className={values.oldPassword === "" ? "inputBox" : "inputBox active"}>
                                <input type="password" className={errors.oldPassword ? "error" : "success"} value={values.oldPassword} onChange={onChange("oldPassword")} />
                                <span>Old password</span>
                                <p>{errors.oldPassword}</p>
                            </div>
                            <div className={values.newPassword === "" ? "inputBox last" : "inputBox active last"}>
                                <input type="password" className={errors.newPassword ? "error" : "success"} value={values.newPassword} onChange={onChange("newPassword")} />
                                <span>New Password</span>
                                <p>{errors.newPassword}</p>
                            </div>
                            <div className={values.confirmPassword === "" ? "inputBox last" : "inputBox active last"}>
                                <input type="password" className={errors.confirmPassword ? "error" : "success"} value={values.confirmPassword} onChange={onChange("confirmPassword")} />
                                <span>Confirm password</span>
                                <p>{errors.confirmPassword}</p>
                            </div>
                            <div className="buttons">
                                <input type="submit" value="Update"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPassword;