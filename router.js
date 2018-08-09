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
  app.post("/api/admin/signin", requireSignin, Authentication.signin);
  app.post("/api/create/course", lessons.createCourse);
  app.post("/api/create/lesson", lessons.createLesson);
  app.get("/api/course/lessons/:id", lessons.getOneCourse);
  app.get("/api/admin/dashboard/manage/courses/:id", lessons.manageOneCourse);
  app.get("/api/courses", lessons.getAllCourses);
  app.post("/api/admin/dashboard/manage/lessons", lessons.deleteLesson);
  app.delete("/api/admin/dashboard/manage/courses/:id", lessons.deleteCourse);
  app.put(
    "/api/admin/dashboard/manage/courses/update/:id",
    lessons.updateCourse
  );
  app.put(
    "/api/admin/dashboard/manage/lessons/update/:id",
    lessons.updateLesson
  );
};
