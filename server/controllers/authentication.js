const User = require("../models/User");
const jwt = require("jsonwebtoken");

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.sign(
    {
      sub: user._id,
      iat: timestamp
    },
    process.env.SECRET
  );
};

module.exports = {
  signin: function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
  },
  signup: function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(process.env.SECRET);
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "You must provide an email and password" });
    }
    //See if a user with the given email exists
    User.findOne({ email: email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(422).send({ error: "Email is in use" });
      }
      // If a user with email does exist, return an error
      const newUser = new User({
        email: email,
        password: password
      });
      // If a user with email does NOT exist, create and save user record
      // Respond to request indicating the user was created

      newUser
        .save()
        .then(user => res.json({ token: tokenForUser(user) }))
        .catch(err => console.log(err));
    });
  }
};
