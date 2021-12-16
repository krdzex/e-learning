import User from "../models/user.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateSignUp from "../validations/registar"
import validateEdit from "../validations/edit"
import validatePassword from "../validations/password"
import _ from "lodash"
import fs from "fs"
import { promisify } from "util";


const createUser = (req, res) => {

    const { errors, isValid } = validateSignUp(req.body);
    const user = new User(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    user.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created account!"
        })
    })
}


const userInfo = (req, res) => {
    let id = req.params.userId
    User.findById(id).select("-hashed_password -created -salt").then(user => {
        res.status(200).json(user)
    })
}

const listUsers = (req, res) => {
    User.find().select("-hashed_password -created -salt -updated -noOfCourses").then(user => {
        res.status(200).json(user)
    })
}

const updateUser = async (req, res) => {
    const deleteImg = promisify(fs.unlink)

    const { errors, isValid } = validateEdit(req.body);
    if (!isValid) {
        if (req.file !== undefined) {
            deleteImg(`../frontend/public/images/${req.file.filename}`)
        }
        return res.status(400).json(errors)
    }
    let id = req.params.userId;
    let user = await User.findById(id);
    const originalImg = user.img;
    user = _.extend(user, req.body)
    if (req.file !== undefined) {
        if (req.file.filename !== undefined) {
            user = _.extend(user, { img: req.file.filename })
        }
    }
    if (user.img === "undefined") {
        user = _.extend(user, { img: originalImg })
    }
    user.updated = Date.now();
    user.save((err, result) => {
        if (err) {
            if (req.file !== undefined) {
                deleteImg(`../frontend/public/images/${req.file.filename}`)
            }
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        if (originalImg !== "noImage.jpg" && req.file !== undefined) {
            deleteImg(`../frontend/public/images/${originalImg}`)
        }
        res.status(200).json({
            message: "Successfully edited account!"
        })
    })
}


const deleteAccount = async (req, res) => {
    let id = req.params.userId;
    let user = await User.findById(id);

    if (req.body.admin) {
        user.active = false;
        user.save((err, result) => {
            res.status(200).json({
                message: "Successfully deleted account!"
            })
        })
    } else {
        if (!user.authenticate(req.body.oldPassword)) {
            return res.status(400).json(
                { oldPassword: "Wrong old password" }
            )
        }

        user.active = false;
        user.save((err, result) => {
            res.status(200).json({
                message: "Successfully deleted account!"
            })
        })
    }

}

const updatePassword = async (req, res) => {
    let userId = req.params.userId;
    const { errors } = validatePassword(req.body);
    let user = await User.findById(userId)
    if (!user.authenticate(req.body.oldPassword)) {
        _.assign(errors, { oldPassword: "Wrong old password" })
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    user = _.extend(user, { password: req.body.newPassword })
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getErrorMessage(err)
            )
        }
        res.status(200).json({ message: "Password edited" })
    })
}



export default { createUser, userInfo, listUsers, updateUser, updatePassword, deleteAccount }