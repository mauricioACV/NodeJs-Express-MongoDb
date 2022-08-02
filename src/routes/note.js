const router = require("express").Router();
const Note = require("../models/Note");

router.get("/note/add", (req, res) => {
  res.render("note/new-note");
});

router.post("/note/new-note", async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a title" });
  }
  if (!description) {
    errors.push({ text: "Please write a description" });
  }
  if (errors.length > 0) {
    res.render("note/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    res.redirect("/notes");
  }
});

router.get("/notes", (req, res) => {
  res.send("Notes from database");
});

module.exports = router;
