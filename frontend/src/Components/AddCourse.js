import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createCourse } from '../ApiService/courseApi';
import { listUsers } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';
import Menu from './Menu';

const AddCourse = () => {

    const [userInformations] = useState(authHelper.isAuthentcated())
    const [mentors, setMentors] = useState([])
    useEffect(() => {
        (async function () {
            let users = await listUsers()
            let allMentors = users.filter(user => user.role === "Mentor");
            setMentors(allMentors)
        }())
    }, [])
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        img: "",
        title: "",
        description: "",
        level: "",
        duration: "",
        author: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }

    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {

        e.preventDefault()

        let formData = new FormData();
        formData.append("title", values.title)
        formData.append("description", values.description)
        formData.append("level", values.level)
        formData.append("duration", values.duration)
        if(userInformations.role === "Admin"){
            for (let i = 0; i < mentors.length; i++) {
                if ((mentors[i].firstName + " " + mentors[i].lastName) === values.author) {
                    formData.append("author", mentors[i]._id)
                    break;
                }
            }
        }else{
            formData.append("author", userInformations._id)
        }
       
        formData.append("img", values.img)
        createCourse(formData).then(response => {
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


    if (values.redirect) return <Navigate to={userInformations.role === "Admin" ? "/dashboard/courses" : "/mentorDashboard"} />
    return (
        <div className="addCourseWrapper">
            <Menu />
            <div className="mainContent middle">
                <div className="addCourse">
                    <div className="card" id="card">
                        <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                            <h3>Add Course</h3>
                            <div className="inputBox active">
                                <input type="file" name="img" className={errors.img ? "error" : "success"} onChange={onChangeFile} />
                                <span>Image</span>
                                <p>{errors.img}</p>
                            </div>
                            <div className={values.title === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.title ? "error" : "success"} value={values.title} onChange={onChange("title")} />
                                <span>Title</span>
                                <p>{errors.title}</p>
                            </div>
                            <div className={values.description === "" ? "inputBox" : "inputBox active"} style={{ marginBottom: "1.2cm" }}>
                                <textarea className={errors.description ? "error" : "success"} value={values.description} onChange={onChange("description")} />
                                <span>Description</span>
                                <p style={{ top: "100px" }}>{errors.description}</p>
                            </div>
                            <div className={values.level === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" list="levels" onMouseDown={() => setValues({ ...values, level: "" })} className={errors.level ? "error" : "success"} value={values.level} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("level")} />
                                <span>Level</span>
                                <datalist id="levels">
                                    <option value="Beginner Level" />
                                    <option value="Intermediate Level" />
                                    <option value="Advanced Level" />
                                </datalist>
                                <p>{errors.level}</p>
                            </div>
                            <div className={values.duration === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" list="duration" onMouseDown={() => setValues({ ...values, duration: "" })} className={errors.duration ? "error" : "success"} value={values.duration} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("duration")} />
                                <span>Duration</span>
                                <datalist id="duration">
                                    <option value="0-3 Hours" />
                                    <option value="3-6 Hours" />
                                    <option value="6-12 Hours" />
                                    <option value="1-2 Days" />
                                    <option value="2-5 Days" />
                                    <option value="5-15 Days" />
                                </datalist>
                                <p>{errors.duration}</p>
                            </div>
                            {userInformations.role === "Admin" && (<div className={values.author === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" list="author" onMouseDown={() => setValues({ ...values, author: "" })} className={errors.author ? "error" : "success"} value={values.author} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("author")} />
                                <span>Author</span>
                                <datalist id="author">
                                    {mentors.map((mentor, id) => (
                                        <option value={mentor.firstName + " " + mentor.lastName} key={id} />
                                    ))}
                                </datalist>
                                <p>{errors.author}</p>
                            </div>)}
                            <div className="buttons">
                                <input type="submit" />
                                <Link to={userInformations.role === "Admin" ? "/dashboard/courses" : "/mentorDashboard"} className="cancelButton"> <div className="button">
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

export default AddCourse;