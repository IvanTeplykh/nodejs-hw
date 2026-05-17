import Note from '../models/note.js';
import createError from 'http-errors';

const getAllNotes = async (req, res, next) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;
  
  const pageNumber = parseInt(page, 10);
  const itemsPerPage = parseInt(perPage, 10);
  const skip = (pageNumber - 1) * itemsPerPage;

  const myQuery = Note.find();

  if (tag) {
    myQuery.where('tag').equals(tag);
  }

  if (search) {
    myQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const filter = myQuery.getQuery();
  const totalNotes = await Note.countDocuments(filter);
  const totalPages = Math.ceil(totalNotes / itemsPerPage);

  myQuery.skip(skip).limit(itemsPerPage);
  const notes = await myQuery;

  res.status(200).json({
    page: pageNumber,
    perPage: itemsPerPage,
    totalNotes,
    totalPages,
    notes,
  });
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
