import pool from "../config/db.js";

export const createUser = async (body) => {
    let client = await pool.connect();
    let user = {
        username: body.username,
        mail: body.mail,
        password: body.password
    };
    try {
        return await client.query("insert into usuario(username, email, password) values($1, $2, $3)", [user.username, user.mail, user.password]);
    } catch (error) {
        return new Error("Algo salio mal :(");
    }
    finally {
        (await client).release()
    }
}

export const getUser = async (mail) => {
    let client = await pool.connect();
    try {
        let { rows } = await client.query("select username, password from usuario where email=$1", [mail]);
        return rows;
    } catch (error) {
        return new Error("Algo salio mal :(");
    }
    finally {
        (await client).release()
    }
}