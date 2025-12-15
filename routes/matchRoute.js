import express from 'express';
import { getMatches, getMatch, newMatch, editMatch } from '../controllers/matchController.js';

export const router = express.Router();
router.get('/', getMatches);
router.get('/:id', getMatch);
router.post('/', newMatch);
router.put('/:id', editMatch);