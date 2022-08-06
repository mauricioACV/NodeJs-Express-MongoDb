const router = require("express").Router();

const User = require("../models/User");

router.get("/user/signin", (req, res) => {
  res.render("user/signin"); //vista signin.hbs
});

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
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'You are registered');
    res.redirect('/user/signin');
  }
});

module.exports = router;
