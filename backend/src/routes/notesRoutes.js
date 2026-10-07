import express from "express";
import {
  getNotes,
  getSpecificNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from "../controllers/notesController.js";

const router = express.Router();

//user request for all the notes in the database
router.get("/", getNotes);

//user request for a specific notes in the database
router.get("/:id", getSpecificNotes);

//user create note
router.post("/", createNotes);

//user update created note
router.put("/:id", updateNotes);

//user delete created or update note
router.delete("/:id", deleteNotes);

export default router;

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("you got 20 notes");
// });

// app.post("/api/notes", (req, res) => {
//   res.status(201).json({ message: "note created successfully" });
// });

// app.put("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "note updated successfully" });
// });

// app.delete("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "note deleted successfully" });
// });
