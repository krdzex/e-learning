import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { editNavigation } from '../Actions';
import { deleteUser } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';
import EditProfileNavigation from './EditProfileNavigation';
import Menu from './Menu';

const DeleteProfile = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(editNavigation("3"))
    }, [dispatch])
    const { userId } = useParams()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        oldPassword: "",
    })
    const onChange = event => {
        setValues({ ...values, oldPassword: event.target.value })
    }

    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            oldPassword: values.oldPassword || undefined,
        }
        deleteUser(userId, user).then(response => {
            if (firstTime) {
                document.getElementById("card").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                authHelper.signOut();
                window.location.reload()
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }
    return (
        <div className="editAccountWrapper">
            <Menu />
            <div className="mainContent middle">
                <EditProfileNavigation />
                <div className="addAccount">
                    <div className="card" id="card">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <h3>Delete Account</h3>
                            <div className={values.oldPassword === "" ? "inputBox" : "inputBox active"}>
                                <input type="password" className={errors.oldPassword ? "error" : "success"} value={values.oldPassword} onChange={onChange} />
                                <span>Old password</span>
                                <p>{errors.oldPassword}</p>
                            </div>
                            <div className="buttons">
                                <input type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProfile;