import Note from '../models/note.js';

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find(req.query);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNote = async (req, res) => {
  const note = new Note(req.body);

  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json(deletedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
