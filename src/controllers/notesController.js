import Note from '../models/note.js';
import createError from 'http-errors';

const getAllNotes = async (req, res, next) => {
  const notes = await Note.find(req.query);
  res.json(notes);
};

const getNoteById = async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);
  if (!note) {
    throw createError(404, 'Note not found');
  }
  res.json(note);
};

const createNote = async (req, res, next) => {
  const note = new Note(req.body);
  const savedNote = await note.save();
  res.status(201).json(savedNote);
};

const updateNote = async (req, res, next) => {
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!updatedNote) {
    throw createError(404, 'Note not found');
  }
  res.json(updatedNote);
};

const deleteNote = async (req, res, next) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
  if (!deletedNote) {
    throw createError(404, 'Note not found');
  }
  res.json(deletedNote);
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
