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
        username: body.username,
        mail: body.mail,
        password: hashedPassword
    };
    const newUser = await createUser(user);
    if (newUser.name == "Error") {
        return {"status": 404, "message": newUser.message};
    }
    return {"status": 201, "message": "Usuario creado exitosamente!"};
}

export const getToken = async (user) => {
    let hashedpassword = await getUser(user.mail);
    if (hashedpassword.name === "Error") {
        return { "status": 404, "message": "Usuario no encontrado" };
    }

    const passwordOk = await bcrypt.compare(user.password, hashedpassword);
    if (!passwordOk) {
        return { "status": 401, "message": "Contraseña incorrecta" };
    }

    const token = jwt.sign({ usuario: user.mail }, process.env.SECRET_KEY, { expiresIn: "1800s" });
    return { "status": 200, "message": token };
}