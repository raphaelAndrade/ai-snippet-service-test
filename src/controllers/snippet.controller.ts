import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';

import Snippet from '../models/snippet.model';
import { summarizeText, streamSummary } from '../services/gemini.service'

export const streamSnippetSummary = async (req: AuthRequest, res: Response) => {
    try {
      const { text } = req.body;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
  
      for await (const chunk of streamSummary(text)) {
        res.write(`data: ${chunk}\n\n`);
      }
  
      res.end();
    } catch (error) {
      console.error('SSE Streaming Error:', error);
      res.write(`event: error\ndata: ${JSON.stringify({ error: 'Streaming failed', details: error instanceof Error ? error.message : error })}\n\n`);
      res.end();
    }
  };

export const getSnippet = async (req: AuthRequest, res: Response) => {
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

export const createSnippet = async (req: AuthRequest, res: Response) => {
    try {
      const { text } = req.body;
  
      const summary = await summarizeText(text);
  
      const snippet = await Snippet.create({
        text,
        summary,
        ownerEmail: req.user?.email,
      });
  
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

export const listSnippets = async (req: AuthRequest, res: Response) => {
  try {
    const filter = req.user?.role === 'admin'
        ? {}
        : { ownerEmail: req.user?.email };
    const snippets = await Snippet.find(filter);
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
