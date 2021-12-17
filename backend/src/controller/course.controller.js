import Course from "../models/course.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateCourse from "../validations/course"
import _ from "lodash"
import fs from "fs"
import { promisify } from "util";


const createCourse = (req, res) => {
    const deleteImg = promisify(fs.unlink)
    if (req.file !== undefined) {
        req.body.img = req.file.filename;
    } else {
        req.body.img = "";
    }
    const { errors, isValid } = validateCourse(req.body);

    const course = new Course(req.body);

    if (!isValid) {
        if (course.img !== "") {
            deleteImg(`../frontend/public/images/${course.img}`)
        }
        return res.status(400).json(errors)
    }
    course.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created course!"
        })
    })
}

const listCourses = (req, res) => {
    Course.find({ active: true }).then(user => {
        res.status(200).json(user)
    })
}

const getUserCourses = (req, res) => {
    let id = req.params.userId;
    Course.find({
        $and: [{ active: true },
        { $or: [{ author: id }, { coAuthors: id }] }]
    }).then(user => {
        res.status(200).json(user)
    })
}


const courseInfo = (req, res) => {
    let id = req.params.courseId;
    Course.findById(id).then(courses => {
        res.status(200).json(courses)
    })
}

const deleteCourse = async (req, res) => {
    let id = req.params.courseId;
    let course = await Course.findById(id);
    course.active = false
    course.save((err, result) => {
        res.status(200).json({
            message: "Successfully deleted course!"
        })
    })
}

const updateCourse = async (req, res) => {
    let id = req.params.courseId;
    Course.findById(id).exec((err, result) => {
        const originalImg = result.img;
        const deleteImg = promisify(fs.unlink)

        let course = result;
        course = _.extend(course, req.body)
        const { errors, isValid } = validateCourse(course);
        if (!isValid) {
            if (req.file !== undefined) {
                deleteImg(`../frontend/public/images/${req.file.filename}`)
            }
            return res.status(400).json(errors)
        }
        if (req.file !== undefined) {
            deleteImg(`../frontend/public/images/${originalImg}`)
            course = _.extend(course, { img: req.file.filename })
        }
        course.save().then(res.json({ message: "Successfuly edited course" })).catch(err => console.log(err))
    })
}

const listCoursesByTitle = (req, res) => {
    let titleName = req.params.titleName;
    Course.find({ title: { $regex: new RegExp(`${titleName}`, 'i') }, active: true }).then(user => {
        res.status(200).json(user)
    })
}

const enrollStudent = async (req, res) => {

    let id = req.params.courseId;
    let course = await Course.findById(id)
    course.students.push({ student: req.body.userId, status: "In progress" })
    course.save().then(
        res.status(200).json("Enrolled student")
    )
}

const listEnrolledCourses = async (req, res) => {
    let inProgress = []
    let id = req.params.userId;
    let courses = await Course.find({ "students.student": id })
    for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses[i].students.length; j++) {
            if (courses[i].students[j].student.toString() === id && courses[i].students[j].status === "In progress") {
                inProgress.push(courses[i]);
            }
        }
    }
    res.status(200).json(inProgress)
}


const completeCourse = async (req, res) => {
    let id = req.params.id;
    let course = await Course.findById(id);
    for (let i = 0; i < course.students.length; i++) {

        if (course.students[i]._id.toString() === req.body.enrollId) {
            course.students[i].status = "Completed"
        }
    }
    course.save().then(
        res.status(200).json("Completed Course")
    )
}

const noOfCompletedCourses = async (req, res) => {
    let id = req.params.id;
    let courses = await Course.find({ "students.student": id })
    let number = 0;
    for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses[i].students.length; j++) {
            if (courses[i].students[j].student.toString() === id && courses[i].students[j].status === "Completed") {
                number++;
            }
        }
    }
    res.status(200).json({ number: number })
}




export default { createCourse, listCourses, deleteCourse, courseInfo, updateCourse, getUserCourses, listCoursesByTitle, enrollStudent, listEnrolledCourses, completeCourse, noOfCompletedCourses }