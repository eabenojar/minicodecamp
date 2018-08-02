const Course = require("../models/Course").Course;
const Lesson = require("../models/Course").Lesson;

module.exports = {
  createCourse: (req, res) => {
    console.log(req.body, "INSIDE CREATE COURSE");
    const newCourse = new Course({
      courseType: req.body.courseType,
      courseDescription: req.body.courseDescription,
      courseDevType: req.body.courseDevType,
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
    console.log("INSIDE FIRST LESSON", req.body);
    Course.findOne({ courseType: req.body.courseType })
      .then(course => {
        console.log("FOUND COURSE", course);
        const newLesson = new Lesson({
          courseType: req.body.courseType,
          lessonNumber: req.body.lessonNumber,
          lessonTitle: req.body.lessonTitle,
          lessonDescription: req.body.lessonDescription,
          lessonCode: req.body.lessonCode
        });
        if (course) {
          newLesson.save().then(lesson => {
            console.log("PUSH LESSONS");
            course.lessons.push(lesson);
            console.log("LESSONS PUSHED", course);
            course
              .save()
              .then(course => {
                res.json(course);
              })
              .catch(err => res.send("ERROR INSIDE"));
          });
        } else {
          res.status(404);
          console.log("NOT COURSE FOUND");
        }
      })
      .catch(err => {
        console.log(err, "COURSE TYPE NOT FOUND");
      });
  },
  getOneCourse: (req, res) => {
    const id = req.params.id;
    Course.findById(id)
      .populate("lessons")
      .then(lesson => {
        console.log("INSIDE SERVER GET ONE COURSE", lesson);
        res.json(lesson);
      })
      .catch(err => {
        console.log(err);
        res.send("ERRR");
      });
  },
  manageOneCourse: (req, res) => {
    const id = req.params.id;
    Course.findById(id)
      .populate("lessons")
      .then(lesson => {
        console.log("INSIDE SERVER MANAGE ONE COURSE", lesson);
        res.json(lesson);
      })
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
    console.log("INSIDE DELETE LESSONS SERVER SIDE", req.body);
    Course.findOne({ courseType: req.body.courseType })
      .then(course => {
        console.log("INSIDE COURSE INSIDE DELETE LESSON");
        if (course) {
          Lesson.findOneAndRemove(req.body._id).then(lesson => {
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
        } else {
          res.status(404);
          console.log("COURSE NOT FOUND");
        }
      })
      .catch(err => {
        console.log(err);
        res.send("COULD NOT FIND COURSE");
      });
  },
  deleteCourse: (req, res) => {
    // req.body.courseType = req.query.coursetype;
    console.log("INSIDE SERVER DELETE COURSE", req.params.id);
    Course.findByIdAndRemove(req.params.id)
      .then(course => {
        Lesson.deleteMany({ courseType: course.courseType })
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
