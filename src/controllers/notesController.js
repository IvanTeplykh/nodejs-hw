import Note from '../models/note.js';
import createError from 'http-errors';

const getAllNotes = async (req, res, next) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const itemsPerPage = parseInt(perPage, 10);
  const skip = (pageNumber - 1) * itemsPerPage;

  const myQuery = Note.find({ userId: req.user._id });

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

  myQuery.skip(skip).limit(itemsPerPage);

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    myQuery,
  ]);

  const totalPages = Math.ceil(totalNotes / itemsPerPage);

  res.status(200).json({
    page: pageNumber,
    perPage: itemsPerPage,
    totalNotes,
    totalPages,
    notes,
  });
};

const getNoteById = async (req, res, next) => {
  const note = await Note.findOne({ _id: req.params.noteId, userId: req.user._id });
  if (!note) {
    throw createError(404, 'Note not found');
  }
  res.json(note);
};

const createNote = async (req, res, next) => {
  const note = new Note({ ...req.body, userId: req.user._id });
  const savedNote = await note.save();
  res.status(201).json(savedNote);
};

const updateNote = async (req, res, next) => {
  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.noteId, userId: req.user._id },
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
  const deletedNote = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user._id });
  if (!deletedNote) {
    throw createError(404, 'Note not found');
  }
  res.json(deletedNote);
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
