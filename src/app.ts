import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import snippetRoutes from './routes/snippet.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/snippets', snippetRoutes);

mongoose.connect(process.env.MONGO_URI || '', {
  dbName: 'ai_snippets'
}).then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo error', err));

export default app;
