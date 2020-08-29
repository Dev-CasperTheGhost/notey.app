const router = require("express").Router();
const Note = require("../models/Note.model");
const User = require("../models/User.model");
const {
  isAuth,
  getUserNotes,
  convertToMarkdown,
} = require("../utils/functions");

/**
 * @Route GET /
 * @Desc Returns all the notes for the authenticated user
 */
router.get("/", isAuth, async (req, res) => {
  const notes = await getUserNotes(req.user.id).catch((e) => console.log(e));

  return res.json({ notes, status: "success" });
});

/**
 * @Route GET /:noteId
 * @Desc Returns the requested note
 */
router.get("/:noteId", isAuth, async (req, res) => {
  const noteId = req.params.noteId;
  let note;
  let user;

  try {
    note = await Note.findById(noteId);
    user = await User.findById(req.user.id);
  } catch (e) {
    note = undefined;
  }

  if (note && note.user_id.toString() !== user._id.toString()) {
    note = undefined;
  }

  return res.json({ note, status: "success" });
});

/**
 * @Route PUT /:noteId
 * @Desc Updates the requested note by Id
 */
router.put("/:noteId", isAuth, async (req, res) => {
  const { title, body, categoryId } = req.body;
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  const markdown = convertToMarkdown(body);

  if (markdown === "" || !markdown) {
    return res.json({
      error: "Please do not include any malicious code.",
      status: "error",
    });
  }

  try {
    note.category_id = categoryId;
    note.title = title;
    note.body = body;
    note.markdown = markdown;

    await note.save();
    const notes = await getUserNotes(req.user.id);

    return res.json({ msg: "Updated", status: "success", note, notes });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Something went wrong", status: "error" });
  }
});

/**
 * @Route POST /
 * @Desc Creates a note
 */
router.post("/", isAuth, async (req, res) => {
  const { title, body, categoryId } = req.body;

  if (title && body && categoryId) {
    if (title.length > 40) {
      return res.json({
        error: "Title has a limit of 40 characters.",
        status: "error",
      });
    }

    const markdown = convertToMarkdown(body);

    if (markdown === "" || !markdown) {
      return res.json({
        error: "Please do not include any malicious  code.",
        status: "error",
      });
    }

    const newNote = new Note({
      user_id: req.user.id,
      title,
      body,
      markdown,
      category_id: categoryId,
    });

    try {
      await newNote.save();
      const notes = await getUserNotes(req.user.id);

      return res.json({ notes, note: newNote, status: "success" });
    } catch (e) {
      console.log(e);
      return res.json({ error: "Something went wrong", status: "error" });
    }
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

/**
 * @Route DELETE /:noteId
 * @Desc Deletes a note by the requested Id
 */
router.delete("/:noteId", isAuth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.noteId);
    const notes = await getUserNotes(req.user.id);

    return res.json({ msg: "Deleted", status: "success", notes });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Something went wrong!", status: "error" });
  }
});

module.exports = router;
