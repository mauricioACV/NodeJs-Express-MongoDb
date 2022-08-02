const router = require("express").Router();

router.get("/user/signin", (req, res) => {
  res.render("user/signin");//vista signin.hbs
});

router.get("/user/signup", (req, res) => {
  res.render("user/signup");//vista signup.hbs
});

module.exports = router;
