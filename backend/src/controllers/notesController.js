import Note from "../models/Note.js";

export async function getNotes(req, res) {
  try {
    //we want to get all the nots
    //we can use .sort(here, what to sort by)
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getNotes controller: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getSpecificNotes(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found!" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getSpecificNotes controller: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function createNotes(req, res) {
  try {
    //the logic to create a note

    //get the value the user passes from req.body
    const { title, content } = req.body;

    //create a new note using the model
    const newNote = new Note({
      title,
      content,
    });

    //save the note created by the user to the database.
    const savedNote = await newNote.save();

    //send the response to the user, either successful operation or failed
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNotes controller: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function updateNotes(req, res) {
  try {
    //get the value the user passes from req.body
    const { title, content } = req.body;

    //find the element to be update using the id, note that we use the Note model
    //findByIdAndUpdate(id, field to update)

    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      //by default the document before update is returned, so we add this line to have to document after update.
      { returnDocument: "after" },
    );

    if (!updateNote)
      return res.status(404).json({ message: "Note not found!" });

    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in updateNotes controller: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function deleteNotes(req, res) {
  try {
    //find the element to be deleted using the id, note that we use the Note model
    //findByIdAndDelete(id, field to delete)

    const noteToDelete = await Note.findByIdAndDelete(req.params.id);

    if (!noteToDelete)
      return res.status(404).json({ message: "Note not found!" });

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNotes controller: ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}
