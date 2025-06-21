import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  summary: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Snippet', snippetSchema);
