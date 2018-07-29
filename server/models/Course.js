const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema(
  {
    courseType: {
      type: String,
      required: true
    },
    lessonNumber: {
      type: Number,
      required: true
    },
    lessonTitle: {
      type: String,
      required: true
    },
    lessonDescription: {
      type: String,
      required: true
    },
    lessonCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const CourseSchema = new Schema(
  {
    courseType: {
      type: String,
      required: true
    },
    courseDevType: {
      type: String,
      required: true
    },
    courseDescription: {
      type: String,
      required: true
    },
    courseColor: {
      type: String
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "lesson" }]
  },
  { timestamps: true }
);

const Course = mongoose.model("course", CourseSchema);
const Lesson = mongoose.model("lesson", LessonSchema);

module.exports = {
  Course: Course,
  Lesson: Lesson
};
