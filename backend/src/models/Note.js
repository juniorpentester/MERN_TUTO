import mongoose from "mongoose";

//create a schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//use the schema to create a model, to use it in our controller function

const Note = mongoose.model("Note", noteSchema);

export default Note;
