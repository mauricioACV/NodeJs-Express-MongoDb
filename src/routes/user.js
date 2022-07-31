const router = require("express").Router();

router.get("/user/signin", (req, res) => {
  res.send("Ingresando a la app");
});

router.get("/user/signup", (req, res) => {
  res.send("Formulario de authentication");
});

module.exports = router;
