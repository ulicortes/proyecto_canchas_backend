import pool from "../config/db.js";

export const matchList = async () => {
    let client = await pool.connect();
    try {
        let r = await client.query("select * from turno")
        return r.rows;
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
        let {rows} = await client.query("select * from turno where id=$1", [id]);
        if (rows.length == 0) {
            throw new Error('Hubo un problema, no se encontro un turno con ese ID')
        }
        await client.query('commit')
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
        await client.query('begin')
        await client.query('insert into turno(organizador, telefono, lugar, direccion, dia, hora, cancha, jugadores_faltantes) values($1, $2, $3, $4, $5, $6, $7, $8)',
            [match.organizador, match.telefono, match.lugar, match.direccion, match.dia, match.hora, match.cancha, match.jugadores_faltantes]);
        await client.query('commit')
        return 'Hotel agregado!';
    } catch (error) {
        await client.query('rollback')
        return new Error(error);
    }
    finally {
        (await client).release()
    }
}

// export const borrarHotel = async (id) => {
//     let client = await pool.connect();
//     try {
//         await client.query('begin')
//         await client.query('delete from hotel where id=$1', [id])
//         await client.query('commit')
//         return 'Hotel borrado!';
//     } catch (error) {
//         await client.query('rollback')
//         throw new Error(error);
//     }
//     finally {
//         (await client).release()
//     }
// }

// export const editarHotel = async (id, body) => {
//     let query = '';
//     let size = Object.keys(body).length-1;
//     let client = await pool.connect();
//     Object.keys(body).forEach(function (key, index) {
//         query+=`${key}=${body[key]}`
//         if(index < size) query += ', '
//     });
//     try {
//         await client.query('begin')
//         await client.query(`update hotel set ${query} where id=$1`, [id])
//         await client.query('commit')
//         return 'Hotel editado!';
//     } catch (error) {
//         await client.query('rollback')
//         throw new Error(error);
//     }
//     finally {
//         (await client).release()
//     }
// }