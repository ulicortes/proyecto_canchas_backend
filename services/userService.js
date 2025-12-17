import jwt from "jsonwebtoken";
import { createUser, getUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (body) => {
    let hashedPassword = await bcrypt.hash(body.password, 10);
    if (!hashedPassword) {
        res.status(500).send();
        return {"status": 500, "message": "Error con la contraseña"};
    }
    let user = {
        username: body.user,
        mail: body.email,
        password: hashedPassword
    };
    const newUser = await createUser(user);
    if (newUser.name == "Error") {
        return {"status": 404, "message": newUser.message};
    }
    return {"status": 201, "message": "Usuario creado exitosamente!"};
}

export const getToken = async (user) => {
    let rsp = await getUser(user.mail);
    if (rsp.name === "Error") {
        return { "status": 404, "message": "Usuario no encontrado" };
    }
    let hashedPassword = rsp[0].password;

    const passwordOk = await bcrypt.compare(user.password, hashedPassword);
    if (!passwordOk) {
        return { "status": 401, "message": "Contraseña incorrecta" };
    }

    const token = jwt.sign({ usuario: rsp[0].username }, process.env.SECRET_KEY, { expiresIn: "1800s" });
    return { "status": 200, "message": {"token":token, "user": rsp[0].username} };
}