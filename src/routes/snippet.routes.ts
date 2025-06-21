import { Router } from 'express';
import { createSnippet, getSnippet, listSnippets } from '../controllers/snippet.controller';

const router = Router();
router.post('/', createSnippet);
router.get('/', listSnippets);
router.get('/:id', getSnippet);
export default router;
