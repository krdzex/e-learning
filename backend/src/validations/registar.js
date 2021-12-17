import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRegistar(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ""

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
    if (!Validator.isLength(data.password, { min: 5 })) {
        errors.password = "Password need minimum five characters";
    }
    if (!Validator.isLength(data.confirmPassword, { min: 5 })) {
        errors.confirmPassword = "Password need minimum five characters";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "You need to confirm password";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords dont match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}