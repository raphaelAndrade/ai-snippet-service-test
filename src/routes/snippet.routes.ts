import { Router } from 'express';
import { createSnippet, getSnippet, listSnippets, streamSnippetSummary } from '../controllers/snippet.controller';

const router = Router();
router.post('/', createSnippet);
router.get('/', listSnippets);
router.get('/:id', getSnippet);
router.post('/stream', streamSnippetSummary);
export default router;
