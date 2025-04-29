const pool = require("../config/database");

const getCosmetics = async (title) => {
    if (!title) {
        const result = await pool.query(`
            SELECT cosmetics.*, brands.name AS brand_name 
            FROM cosmetics 
            LEFT JOIN brands ON cosmetics.brand_id = brands.id
        `);
        return result.rows;
    } else {
        const result = await pool.query(`
            SELECT cosmetics.*, brands.name AS brand_name 
            FROM cosmetics 
            LEFT JOIN brands ON cosmetics.brand_id = brands.id 
            WHERE cosmetics.name ILIKE $1
        `, [`%${title}%`]);
        return result.rows;
    }
};

const getAllCosmetics = async () => {
    const result = await pool.query(`
        SELECT cosmetics.*, brands.name AS brand_name 
        FROM cosmetics 
        LEFT JOIN brands ON cosmetics.brand_id = brands.id
    `);
    return result.rows;
};

const getCosmeticById = async (id) => {
    const result = await pool.query(`
        SELECT cosmetics.*, brands.name AS brand_name 
        FROM cosmetics 
        LEFT JOIN brands ON cosmetics.brand_id = brands.id 
        WHERE cosmetics.id = $1
    `, [id]);
    if (result.rowCount === 0) {
        throw new Error("Cosmético não encontrado.");
    }
    return result.rows[0];
};

const createCosmetic = async (name, product, color, type, price, brandId) => {
    const result = await pool.query(`
        INSERT INTO cosmetics (name, product, color, type, price, brand_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [name, product, color, type, price, brandId]);
    return result.rows[0];
};

const updateCosmetic = async (id, name, product, color, type, price, brandId) => {
    const result = await pool.query(`
        UPDATE cosmetics 
        SET name = $1, product = $2, color = $3, type = $4, price = $5, brand_id = $6 
        WHERE id = $7 RETURNING *
    `, [name, product, color, type, price, brandId, id]);
    if (result.rowCount === 0) {
        throw new Error("Cosmético não encontrado para atualização.");
    }
    return result.rows[0];
};

const deleteCosmetic = async (id) => {
    const result = await pool.query("DELETE FROM cosmetics WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        throw new Error("Cosmético não encontrado para exclusão.");
    }
    return { message: "Cosmético deletado com sucesso." };
};

module.exports = { 
    getCosmetics, 
    getAllCosmetics, 
    getCosmeticById, 
    createCosmetic, 
    updateCosmetic, 
    deleteCosmetic 
};