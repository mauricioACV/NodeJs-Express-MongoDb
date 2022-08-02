const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");//pagina index.hbs
});

router.get("/about", (req, res) => {
  res.render("about");//pagina about.hbs
});

module.exports = router;
