import express from 'express';
// import { autenticacion } from '../middleware/auth.js';
import { getMatches, getMatch, newMatch } from '../controllers/matchController.js';

export const router = express.Router();
router.get('/', getMatches);
router.get('/:id', getMatch);
router.post('/', newMatch);