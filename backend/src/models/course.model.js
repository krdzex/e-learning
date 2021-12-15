import mongoose from "mongoose"


const CourseSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    level: {
        type: String, trim: true
    },
    duration: { type: String, trim: true },
    author: { type: mongoose.Types.ObjectId },
    students: [{student: mongoose.Types.ObjectId,status: String}],
    img: { type: String }
})

export default mongoose.model("Course", CourseSchema)

