import { oneMatch, createNewMatch, editOneMatch, allMatches } from "../services/matchService.js";

export const getMatches = async (req, res) => {
    const matches = await allMatches();
    return res.status(matches.status).send(matches.message);
}

export const getMatch = async (req, res) => {
    const { id } = req.params;
    const match = await oneMatch(id);
    return res.status(match.status).send(match.message);
}

export const newMatch = async (req, res) => {
    const match = await createNewMatch(req.body);
    return res.status(match.status).send(match.message);
}

export const editMatch = async (req, res) => {
    const { id } = req.params;
    const { lista } = req.body;
    const match = await editOneMatch(id, lista);
    return res.status(match.status).send(match.message);
}