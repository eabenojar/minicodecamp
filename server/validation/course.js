const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.courseType = !isEmpty(data.courseType) ? data.courseType : "";
  data.courseDevType = !isEmpty(data.courseDevType) ? data.courseDevType : "";
  data.courseDescription = !isEmpty(data.courseDescription)
    ? data.courseDescription
    : "";
  data.courseColor = !isEmpty(data.courseColor) ? data.courseColor : "";

  if (Validator.isEmpty(data.courseType)) {
    errors.courseType = "Course type is required";
  }

  if (Validator.isEmpty(data.courseDevType)) {
    errors.courseDevType = "Course dev type is required";
  }

  if (Validator.isEmpty(data.courseDescription)) {
    errors.courseDescription = "Course description is required";
  }
  if (!Validator.isHexColor(data.courseColor)) {
    errors.courseColor = "Course color is not valid";
  }
  if (Validator.isEmpty(data.courseColor)) {
    errors.courseColor = "Course color is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
