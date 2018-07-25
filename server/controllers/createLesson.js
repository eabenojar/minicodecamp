const Course = require("../models/Course").Course;
const Lesson = require("../models/Course").Lesson;

module.exports = {
  createCourse: (req, res) => {
    console.log(req.body, "INSIDE CREATE COURSE");
    const newCourse = new Course({
      courseType: req.body.courseType,
      courseDescription: req.body.courseDescription
    });
    newCourse
      .save()
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },
  createLesson: (req, res) => {
    console.log("INSIDE FIRST LESSON", Course);
    Course.findOne({ courseType: req.body.courseType })
      .then(course => {
        const newLesson = new Lesson({
          courseType: req.body.courseType,
          lessonNumber: req.body.lessonNumber,
          lessonTitle: req.body.lessonTitle,
          lessonDescription: req.body.lessonDescription,
          lessonCode: req.body.lessonCode
        });
        newLesson.save().then(lesson => {
          course.lessons.push(lesson);
          course
            .save()
            .then(course => {
              res.json(course);
            })
            .catch(err => res.send("ERROR INSIDE"));
        });
      })
      .catch(err => {
        console.log(err);
        res.send("TYPE NOT FOUND");
      });
  },
  getCourses: (req, res) => {
    console.log("checks");
    Course.findOne({ courseType: "REACT" })
      .populate("lessons")
      .then(lesson => res.json(lesson))
      .catch(err => {
        console.log(err);
        res.send("ERRR");
      });
  }
};
