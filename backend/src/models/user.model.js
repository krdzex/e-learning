import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
    },
    noOfCourses: { type: Number, default: 0 },
    role: { type: String, default: false },
    created: {
        type: Date,
        default: Date.now
    },
    active: { type: Boolean, default: false },
    hashed_password: {
        type: String,
        trim: true
    },
    updated: Date,
    salt: String,
    img: { type: String, default:"noImage.jpg" }
})

UserSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();

    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
        } catch (error) {
            return ""
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

export default mongoose.model("User", UserSchema)


