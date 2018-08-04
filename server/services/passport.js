const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Validation
const validateSignIn = require("../validation/auth");

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  console.log("INSIDE PASSPORT", email, password);
  const { errors, isValid } = validateSignIn({
    email: email,
    password: password
  });

  // // Check Validation
  // if (!isValid) {
  //   console.log("INVALID ");
  //   return res.status(400).json({ errors });
  // }
  console.log("INSIDE LOCAL STRATEGY");
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      console.log("ERROR CANT FIND");
      return res.status(400).json({ test: "TESTETETS3231ETE" });

      return done(err);
    }
    if (!user) {
      console.log("ERROR CANT FIfafaeffeND");

      return res.status(400).json({ test: "TESTETETSETE2332" });

      return done(null, false);
    }
    console.log("INSIDE SEVER FOUND", email, password);
    // compare passwords - is 'password' equal to user.password
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        console.log("WRONG PASSWORD");
        return done(null, false, { password: "Incorrect Password" });
      }
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "k1r1l3kn1l3kn13k31rnl13n31r1"
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
