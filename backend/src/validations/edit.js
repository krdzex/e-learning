import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEdit(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : ""

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required";
    }
    if (!Validator.matches(data.firstName, /^[a-zA-Z0-9\s]*$/)) {
        errors.title = "No special characters allowed";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name is required";
    }
    if (!Validator.matches(data.lastName, /^[a-zA-Z0-9\s]*$/)) {
        errors.title = "No special characters allowed";
    }
    if (!Validator.isLength(data.firstName, { max: 30 })) {
        errors.firstName = "First name is longer then 30 characters";
    }
    if (!Validator.isLength(data.lastName, { max: 30 })) {
        errors.lastName = "Last name is longer then 30 characters";
    }
    if (!/^[a-z0-9]((\.|\+)?[a-z0-9]){3,}\@([a-zA-Z0-9]+){3,}([\.])([a-zA-Z\.]+){2,}/.test(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}