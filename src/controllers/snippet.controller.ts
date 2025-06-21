import { RequestHandler } from 'express';
import Snippet from '../models/snippet.model';

export const getSnippet: RequestHandler = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSnippet: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    const summary = 'stub-summary';
    const snippet = await Snippet.create({ text, summary });
    res.status(201).json({ id: snippet._id, text, summary });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listSnippets: RequestHandler = async (_req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(
      snippets.map((s) => ({
        id: s._id,
        text: s.text,
        summary: s.summary,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
