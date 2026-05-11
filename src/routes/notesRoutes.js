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
router.get('/:id', getNoteById);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
