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

router.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ date: "desc" }).lean();
  res.render("note/all-notes", { notes });
});

router.get("/note/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("note/edit-note", { note });
});

router.put("/note/update-note/:id", async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect("/notes");
});

router.delete("/note/delete-note/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/notes");
});

module.exports = router;
