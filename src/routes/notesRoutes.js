import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = new Router();

router.use(authenticate);

router.post('/', celebrate(createNoteSchema), createNote);

router.get('/', celebrate(getAllNotesSchema), getAllNotes);

router.get('/:noteId', celebrate(noteIdSchema), getNoteById);

router.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

router.delete('/:noteId', celebrate(noteIdSchema), deleteNote);

export default router;
