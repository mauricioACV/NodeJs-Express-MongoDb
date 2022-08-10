const router = require("express").Router();
const passport = require("passport");

const User = require("../models/User");

router.get("/user/signin", (req, res) => {
  res.render("user/signin"); //vista signin.hbs
});

router.post(
  "/user/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

router.get("/user/signup", (req, res) => {
  res.render("user/signup"); //vista signup.hbs
});

router.post("/user/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0) {
    errors.push({ text: "Plase insert your name" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password do not match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("user/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      console.log("existe");
      errors.push({ text: "The email is already use" });
      res.render("user/signup", {
        errors,
        name,
        email,
        password,
        confirm_password,
      });
      // req.flash("error_msg", "The email is already use");
      // res.redirect("/user/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered");
      res.redirect("/user/signin");
    }
  }
});

router.get("/user/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
