import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRegistar(data) {
    let errors = {}

    data.img = !isEmpty(data.img) ? data.img : ""
    data.title = !isEmpty(data.title) ? data.title : ""
    data.description = !isEmpty(data.description) ? data.description : ""
    data.level = !isEmpty(data.level) ? data.level : ""
    data.duration = !isEmpty(data.duration) ? data.duration : ""
    data.author = !isEmpty(data.author) ? data.author : ""

    if (Validator.isEmpty(data.img)) {
        errors.img = "Image is required";
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description is required";
    }
    if (!Validator.isLength(data.title, { max: 55 })) {
        errors.title = "Title is longer then 5 characters";
    }
    if (!Validator.isLength(data.description, { max: 220 })) {
        errors.description = "Description is longer then 220 characters";
    }
    if (Validator.isEmpty(data.level)) {
        errors.level = "Level is required";
    }
    if (Validator.isEmpty(data.duration)) {
        errors.duration = "Duration is required";
    }
    if (data.author === "") {
        errors.author = "Author is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}