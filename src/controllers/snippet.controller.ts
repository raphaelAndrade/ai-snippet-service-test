import { RequestHandler } from 'express';
import Snippet from '../models/snippet.model';
import { summarizeText } from '../services/gemini.service'

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
  
      const summary = await summarizeText(text);
  
      const snippet = await Snippet.create({ text, summary });
  
      res.status(201).json({
        id: snippet._id,
        text,
        summary
      });
    } catch (error) {
        console.error('Error creating snippet:', error);
        res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : error });
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
