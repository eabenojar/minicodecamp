const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const CreateLesson = require("./controllers/createLesson");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // app.get("/", requireAuth, function(res, res) {
  //   res.send({ hi: "There" });
  // });
  app.post("/signup", Authentication.signup);
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/create/course", CreateLesson.createCourse);
  app.post("/create/lesson", CreateLesson.createLesson);
  app.get("/course", CreateLesson.getCourses);
};
