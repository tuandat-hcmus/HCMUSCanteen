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

    insert: async (tbName, entity) => {
        try {
            const query = pgp.helpers.insert(entity, null, tbName);
            const result = await db.one(query + ' returning *');
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

    delete: async (tbName, col, val) => {
        try {
            const result = await db.result(
                `DELETE FROM "${tbName}" WHERE ${col} = $1 RETURNING *`, [val]
            );
            if (result.rowCount > 0) {
                console.log(`Deleted row with value ${val} in colmn ${col}`);
            }
            else {
                console.log(`No rows deleted. Row not found`);
            }
        } catch (error) {
            console.log('Delete error: ', error);
        }
    },

    selectAll: async (tbName) => {
        try {
            const data = await db.any(`SELECT * FROM "${tbName}"`);
            return data;
        }
        catch (error) {
            console.log('Select all error: ', error);
        }
    },

    selectAllBy: async (tbName, colOrder, isDesc) => {
        try {
            const query = `
            SELECT * FROM "${tbName}"
            `;
            if (colOrder) {
                if (isDesc) {
                    query += `ORDER BY ${colOrder} DESC `;
                }
                else query += `ORDER BY ${colOrder} ASC `;
            }
            const data = await db.any(query);
            return data;
        }
        catch (error) {
            console.log('Select all error: ', error);
        }
    },

    selectTopByCol: async (tbName, col, limit, isDesc) => {
        try {
            const query = `
            SELECT * 
            FROM ${tbName}
            WHERE ${col} IS NOT NULL 
            `;
            if (isDesc) {
                query += `ORDER BY ${col} DESC `;
            }
            else query += `ORDER BY ${col} ASC `;

            if (limit) {
                query += `LIMIT ${limit} `;
            }
            return db.manyOrNone(query);
        } catch (error) {
            console.log('Select top by property error: ', error);
        }
    },

    select: async (tbName, col, val) => {
        try {
            const query = `
                SELECT *
                FROM "${tbName}"
                WHERE "${col}" = '${val}'
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

    joinTB: async (tb1, tb2, col1, col2, val) => {
        try {
            const query = `
                SELECT *
                FROM "${tb1}"
                JOIN "${tb2}" ON "${tb1}"."${col1}" = "${tb2}"."${col1}"
                WHERE "${col2}" = $1
            `;
            return db.manyOrNone(query, [val]);
        } catch (error) {
            console.log("Join table error: ", error);
        }
    },

    joinTB: async (tb1, tb2, col1, col2, colWhere, val, colOrder, isDesc, limit) => {
        try {
            const query = `
                SELECT *
                FROM "${tb1}"
                JOIN "${tb2}" ON "${tb1}"."${col1}" = "${tb2}"."${col2}"
                WHERE "${colWhere}" = $1
            `;
            if (colOrder) {
                if (isDesc) {
                    query += `ORDER BY ${colOrder} DESC `;
                }
                else query += `ORDER BY ${colOrder} ASC `;
            }

            if (limit) {
                query += `LIMIT ${limit} `;
            }
            return db.manyOrNone(query, [val]);
        } catch (error) {
            console.log("Join table error: ", error);
        }
    }
}