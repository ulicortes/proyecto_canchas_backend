import { matchCreate, matchDetail, matchEdit, matchList } from "../models/matchModel.js";

export const allMatches = async () => {
    const matches = await matchList();
    if( matches.name == "Error") {
        return { "status": 404, "message": matches.message };
    }
    const rsp = matches.filter(m => m.dia >= new Date().toISOString());
    return { "status": 200, "message": rsp };
}

export const oneMatch = async (id) => {
    const match = await matchDetail(id);
    if (match.name == "Error") {
        return { "status": 404, "message": match.message };
    }
    return { "status": 200, "message": match };
}

export const createNewMatch = async (body) => {
    const match = await matchCreate(body);
    if (match.name == "Error") {
        return { "status": 404, "message": match.message };
    }
    return { "status": 201, "message": match };
}

export const editOneMatch = async (id, lista) => {
    const editMatch = await matchEdit(id, lista);
    if (editMatch.name == "Error") {
        return { "status": 404, "message": editMatch.message };
    }
    return { "status": 200, "message": editMatch };
}