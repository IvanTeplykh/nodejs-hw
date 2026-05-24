import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, default: '' },
    tag: {
      type: String,
      enum: TAGS,
      default: TAGS.find((tag) => tag === 'Todo'),
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

noteSchema.index({ tag: 1 });

const Note = mongoose.model('Note', noteSchema);
export default Note;
