const Course = require("../models/Course").Course;
const Lesson = require("../models/Course").Lesson;
// Load Validation
const validateCourse = require("../validation/course");
const validateLesson = require("../validation/lesson");

module.exports = {
  createCourse: (req, res) => {
    console.log(req.body, "INSIDE CREATE COURSE");
    const { errors, isValid } = validateCourse(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      console.log("ERRORS", errors);
      return res.status(400).json(errors);
    }
    Course.findOne({ courseType: req.body.courseType })
      .then(course => {
        if (course) {
          console.log("COURSE IS FOUND");
          res.status(400).json({ courseType: "Course already exists" });
        } else {
          console.log("COURSE NOT FOUND AND NOW CAN MAKE NEW ONE");
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
        }
      })
      .catch(err => console.log("ERRRR", err));
  },
  createLesson: (req, res) => {
    console.log("INSIDE FIRST LESSON", req.body);
    const { errors, isValid } = validateLesson(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      console.log("ERRORSRRRRRRRRRR", errors);
      return res.status(400).json(errors);
    }
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
              .catch(err => res.status(404));
          });
        } else {
          res.status(404).json({ courseType: "Course does not exist" });
        }
      })
      .catch(err => {
        res.json(err);
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
        res.json(err);
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
        res.json(err);
      });
  },
  getAllCourses: (req, res) => {
    console.log("IN SERVER GET COURSES");
    Course.find()
      .populate("lessons")
      .then(course => {
        console.log("SUCCESS GET COURSES");

        res.json(course);
      })
      .catch(err => {
        console.log("IN SERVER CANT GET COURSES");
        res.status(404).json({ error: "Course not found" });
      });
  },
  deleteLesson: (req, res) => {
    console.log("INSIDE DELETE LESSONS SERVER SIDE", req.body);
    Course.findOne({ courseType: req.body.courseType })
      .then(course => {
        if (course) {
          Lesson.findByIdAndRemove(req.body._id).then(lesson => {
            console.log("INSIDE LESSON", course.lessons, lesson);
            const newCourseLessons = course.lessons.filter(item => {
              console.log("EACAEEC", item, lesson._id.toString());
              if (item.toString() !== lesson._id.toString()) {
                return item;
              }
            });
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
        res.json(err);
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
            res.json("CANT FIND LESSONS");
          });
      })
      .catch(err => {
        console.log(err);
        res.status(404);
      });
  },
  // updateCourse: (req, res) => {
  //   const id = req.params.id;
  //   console.log("INSIDE UPDATE COURSE", id, req.body);
  //   Course.findById(id)
  //     .populate("lessons")
  //     .then(course => {
  //       let updatedCourse = course.lessons.map(lesson => {
  //         // return { ...lesson, courseType: req.body.courseType };

  //         lesson.courseType = req.body.courseType;
  //         return lesson;
  //       });
  //       (course.courseType = req.body.courseType),
  //         (course.courseDescription = req.body.courseDescription),
  //         (course.courseDevType = req.body.courseDevType),
  //         (course.courseColor = req.body.courseColor);
  //       course.lessons = updatedCourse;
  //       res.json(course);
  //       course
  //         .save()
  //         .then(updatedCourse => {
  //           updatedCourse.lessons.map(lesson => {
  //             Lesson.findOneAndUpdate(
  //               { courseType: course.courseType },
  //               { courseType: req.body.courseType }
  //             )
  //               .then(lessons => {
  //                 res.json(lessons);
  //               })
  //               .catch(err => res.json(err));
  //           });
  //           console.log("FINAL UPDATED", updatedCourse);
  //           res.json(updatedCourse);
  //         })
  //         .catch(err => res.json(err));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.send("ERROR CAN NOT FUND COURSE");
  //     });
  // },
  updateCourse: (req, res) => {
    const id = req.params.id;
    console.log("INSIDE UPDATE COURSE", id, req.body);
    Course.findByIdAndUpdate(id, req.body, { new: true })
      .populate("lessons")
      .then(course => {
        course.lessons.map(lesson => {
          Lesson.findOneAndUpdate(
            { courseType: lesson.courseType },
            { courseType: req.body.courseType }
          )
            .then(lessons => {
              res.json(lessons);
            })
            .catch(err => res.json(err));
        });

        res.json(course);
      })
      .catch(err => {
        console.log(err);
        res.status(404);
      });
  },
  updateLesson: (req, res) => {
    const id = req.params.id;
    Lesson.findByIdAndUpdate(id, req.body, { new: true })
      .then(lesson => res.json(lesson))
      .catch(err => res.json(err));
  }
};
