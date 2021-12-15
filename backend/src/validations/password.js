import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRegistar(data) {
    let errors = {}

    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : ""
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : ""
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ""


    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = "New Password is required";
    }
    if (Validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = "Old Password is required";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "You need to confirm password";
    }
    if (!Validator.equals(data.newPassword, data.confirmPassword)) {
        errors.confirmPassword = "Passwords dont match";
    }
    return {
        errors
    }

}