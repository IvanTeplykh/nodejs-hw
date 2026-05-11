import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const router = new Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:noteId', getNoteById);
router.patch('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

export default router;
