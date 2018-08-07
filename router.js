const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const lessons = require("./controllers/lessons");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // app.get("/", requireAuth, function(res, res) {
  //   res.send({ hi: "There" });
  // });
  app.post("/signup", Authentication.signup);
  app.post("/admin/signin", requireSignin, Authentication.signin);
  app.post("/create/course", lessons.createCourse);
  app.post("/create/lesson", lessons.createLesson);
  app.get("/course/lessons/:id", lessons.getOneCourse);
  app.get("/admin/dashboard/manage/courses/:id", lessons.manageOneCourse);
  app.get("/courses", lessons.getAllCourses);
  app.post("/admin/dashboard/manage/lessons", lessons.deleteLesson);
  app.delete("/admin/dashboard/manage/courses/:id", lessons.deleteCourse);
  app.put("/admin/dashboard/manage/courses/update/:id", lessons.updateCourse);
  app.put("/admin/dashboard/manage/lessons/update/:id", lessons.updateLesson);
};
