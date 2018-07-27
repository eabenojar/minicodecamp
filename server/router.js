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
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/create/course", lessons.createCourse);
  app.post("/create/lesson", lessons.createLesson);
  app.get("/course/:id", lessons.getOneCourse);
  app.get("/course", lessons.getAllCourses);
  app.delete("/delete/lesson/:id", lessons.deleteLesson);
  app.delete("/delete/course/", lessons.deleteCourse);
};
