import { matchList, matchDetail, matchCreate } from "../services/matchService.js";

export const getMatches = async (req, res) => {
    const matches = await matchList();
    if (matches.name == "Error") {
        res.status(404).send(matches.message)
        return;
    }
    res.status(200).send(matches);
}

export const getMatch = async (req, res) => {
    const { id } = req.params;
    const matches = await matchDetail(id);
    if (matches.name == "Error") {
        res.status(404).send(matches.message);
        return;
    }
    res.status(200).send(matches);
}

export const newMatch = async (req, res) => {
    const match = req.body;
    const createMatch = await matchCreate(match);
    if (createMatch.name == "Error") {
        res.status(404).send(createMatch.message);
        return;
    }
    res.status(200).send(createMatch);
}