import express from "express";
import userController from "../controller/user.controller";
import multer from "multer";
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.route("/register").post(userController.createUser)
router.route("/user/:userId").get(userController.userInfo).put(upload.single("img"), userController.updateUser)
router.route("/users").get(userController.listUsers)
router.route("/user/password/:userId").put(userController.updatePassword)
router.route("/user/delete/:userId").put(userController.deleteAccount)



export default router;