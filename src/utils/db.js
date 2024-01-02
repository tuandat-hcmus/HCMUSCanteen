require('dotenv').config();
const pgp = require('pg-promise')();

const cn = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
};
const db = pgp(cn);

module.exports = {
    insertWithoutID: async (tbName, entity) => {
        try {
            const { id, ...userFields } = entity;
            const query = {
                text: `INSERT INTO "${tbName}" ("${Object.keys(userFields).join('", "')}") VALUES(${Object.keys(userFields).map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
                values: Object.values(userFields),
            };
            const result = await db.oneOrNone(query);
            if (result) {
                console.log(`1 row inserted to ${tbName}.`);
                return result;
            } else {
                console.log('No data returned from the query.');
                return null;
            }
        } catch (error) {
            console.log('Insert error: ', error);
        }
    },

    delete: async (tbName, id) => {
        try {
            const result = await db.result(
                `DELETE FROM "${tbName}" WHERE id = $1 RETURNING *`, [id]
            );
            if (result.rowCount > 0) {
                console.log(`Deleted row with id ${id}`);
            }
            else {
                console.log(`No rows deleted. Row with id ${id} not found`);
            }
        } catch (error) {
            console.log('Delete error: ', error);
        }
    },

    selectAll: async (tbName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "${tbName}"`);
            return data;
        }
        catch (error) {
            console.log('Select all error: ', error);
        }
        finally {
            dbcn.done();
        }
    },

    selectTopByProp: async (tbName, prop, limit) => {
        try {
            const query = `
            SELECT * 
            FROM ${tbName}
            WHERE ${prop} IS NOT NULL
            ORDER BY ${prop} DESC
            LIMIT ${limit}
        `;
            return db.manyOrNone(query);
        } catch (error) {
            console.log('Select top by property error: ', error);
        }
    },

    select: async (tbName, prop, condition) => {
        try {
            const query = `
                SELECT *
                FROM "${tbName}"
                WHERE "${prop}" = '${condition}'
            `;
            return db.oneOrNone(query);
        } catch (error) {
            console.log('Select property by condition error: ', error);
        }
    },

    count: async (tbName) => {
        try {
            const query = `
                SELECT COUNT(*) 
                FROM "${tbName}"
            `;
            const result = await db.one(query);
            return parseInt(result.count, 10);
        } catch (error) {
            console.log('Count error: ', error);
        }
    },

    joinTB: async (tb1, tb2, cond, prop, condition) => {
        try {
            const query = `
                SELECT *
                FROM "${tb1}"
                JOIN "${tb2}" ON "${tb1}"."${cond}" = "${tb2}"."${cond}"
                WHERE "${prop}" = $1
            `;
            return db.manyOrNone(query, [condition]);
        } catch (error) {
            console.log("Join table error: ", error);
        }
    }
}