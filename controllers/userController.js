import { registerUser, getToken } from "../services/userService.js";

export const register = async (req, res) => {
    const response = await registerUser(req.body);
    return res.status(response.status).send(response.message);
}

export const loginUser = async (req, res) => {
    const response = await getToken(req.body);
    const jsonrsp = JSON.stringify(response)
    return res.status(response.status).send(jsonrsp);
}