const Course = require("../models/Course").Course;
const Lesson = require("../models/Course").Lesson;

module.exports = {
  createCourse: (req, res) => {
    console.log(req.body, "INSIDE CREATE COURSE");
    const newCourse = new Course({
      courseType: req.body.courseType,
      courseDescription: req.body.courseDescription,
      courseColor: req.body.courseColor
    });
    newCourse
      .save()
      .then(result => {
        res.json(result);
      })
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
  getOneCourse: (req, res) => {
    const id = req.params.id;
    Course.findById(id)
      .populate("lessons")
      .then(lesson => res.json(lesson))
      .catch(err => {
        console.log(err);
        res.send("ERRR");
      });
  },
  getAllCourses: (req, res) => {
    console.log("IN SERVER GET COURSES");
    Course.find()
      .populate("lessons")
      .then(course => res.send(course))
      .catch(err => {
        console.log(err);
        res.send("ERROR COULD NOT RETRIEVE COURSES");
      });
  },
  deleteLesson: (req, res) => {
    Course.findOne({ courseType: req.body.courseType })
      .then(course => {
        Lesson.findByIdAndRemove(req.params.id).then(lesson => {
          console.log("INSIDE LESSON", course.lessons);
          const newCourseLessons = course.lessons.filter(item => {
            console.log("EACAEEC", typeof item, typeof lesson._id.toString());
            if (item.toString() !== lesson._id.toString()) {
              return item;
            }
          });
          console.log("NEW LESSONS", newCourseLessons);
          course.lessons = newCourseLessons;
          console.log("AFTER COURSE", course.lessons);
          course
            .save()
            .then(course => res.json(course))
            .catch(err => console.log(err));
        });
      })
      .catch(err => {
        console.log(err);
        res.send("COULD NOT FIND COURSE");
      });
  },
  deleteCourse: (req, res) => {
    // req.body.courseType = req.query.coursetype;
    Course.findOneAndRemove({ courseType: req.body.courseType })
      .then(course => {
        Lesson.deleteMany({ courseType: req.body.courseType })
          .then(lesson => {
            res.json({ lesson: lesson, course: course });
          })
          .catch(err => {
            console.log(err);
            res.send("CANT FIND LESSONS");
          });
      })
      .catch(err => {
        console.log(err);
        res.send('ERROR CAN"T FIND COURSE');
      });
  },
  updateCourse: (req, res) => {
    const id = req.params.id;
    Course.findByIdAndUpdate(id, {
      courseType: req.body.courseType,
      courseDescription: req.body.courseDescription
    }).then(course => res.json(course));
  }
};
