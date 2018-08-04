const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLessonInput(data) {
  let errors = {};

  data.courseType = !isEmpty(data.courseType) ? data.courseType : "";
  data.lessonNumber = !isEmpty(data.lessonNumber) ? data.lessonNumber : "";
  data.lessonTitle = !isEmpty(data.lessonTitle) ? data.lessonTitle : "";
  data.lessonDescription = !isEmpty(data.lessonDescription)
    ? data.lessonDescription
    : "";
  data.lessonCode = !isEmpty(data.lessonCode) ? data.lessonCode : "";

  if (Validator.isEmpty(data.courseType)) {
    errors.courseType = "Course type is required";
  }
  if (data.courseType === "NOTFOUND") {
    errors.courseType = "Course type not found";
  }

  if (Validator.isEmpty(data.lessonNumber)) {
    errors.lessonNumber = "Lesson number is required";
  }

  if (!Validator.isNumeric(data.lessonNumber)) {
    errors.lessonNumber = "Numbers only";
  }

  if (Validator.isEmpty(data.lessonTitle)) {
    errors.lessonTitle = "Lesson title is required";
  }

  if (Validator.isEmpty(data.lessonDescription)) {
    errors.lessonDescription = "Lesson description is required";
  }

  if (Validator.isEmpty(data.lessonCode)) {
    errors.lessonCode = "Lesson code is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
