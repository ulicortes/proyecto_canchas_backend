import pool from "../config/db.js";

export const matchList = async () => {
    let client = await pool.connect();
    try {
        let { rows } = await client.query("select * from turno order by dia, hora")
        return rows;
    } catch (error) {
        return new Error("Algo salio mal :(");
    }
    finally {
        (await client).release()
    }
}

export const matchDetail = async (id) => {
    let client = await pool.connect();
    try {
        await client.query('begin')
        let { rows } = await client.query("select * from turno where id=$1", [id]);
        if (rows.length == 0) {
            throw new Error('Hubo un problema, no se encontro un turno con ese ID')
        }
        await client.query('commit');
        if (new Date(rows[0].dia) < Date.now()) {
            throw new Error('Este turno ya pasò!!');
        }
        return rows[0];
    } catch (error) {
        await client.query('rollback')
        return error;
    }
    finally {
        (await client).release()
    }
}

export const matchCreate = async (match) => {
    let client = await pool.connect();
    try {
        await client.query('begin');
        let { rows } = await client.query("select 1 from turno where dia=$1 and hora=$2 and cancha=$3", [match.dia, match.hora, match.cancha]);
        if (rows.length > 0) {
            throw new Error('Ya existe un turno en esa fecha, hora y cancha');
        }
        await client.query('insert into turno(organizador, telefono, lugar, direccion, dia, hora, cancha, jugadores_faltantes) values($1, $2, $3, $4, $5, $6, $7, $8)',
            [match.organizador, match.telefono, match.lugar, match.direccion, match.dia, match.hora, match.cancha, match.jugadores_faltantes]);
        await client.query('commit')
        return 'Turno agregado!';
    } catch (error) {
        await client.query('rollback')
        return new Error(error);
    }
    finally {
        (await client).release()
    }
}

export const matchEdit = async (id, lista) => {
    let client = await pool.connect();
    try {
        await client.query('begin')
        await client.query('update turno set lista=$1 WHERE id=$2', [lista, id]);
        await client.query('commit')
        return 'Lista actualizada!';
    } catch (error) {
        await client.query('rollback')
        return new Error(error);
    }
    finally {
        (await client).release()
    }
}