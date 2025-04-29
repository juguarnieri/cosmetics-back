const pool = require("../config/database");

const getBrands = async () => {
    const result = await pool.query("SELECT * FROM brands");
    return result.rows;
};
const createBrand = async (name, photo) => {
    const result = await pool.query(
        "INSERT INTO brands (name, photo) VALUES ($1, $2) RETURNING *",
        [name, photo]
    );
    return result.rows[0];
};

const getBrandById = async (id) => {
    const result = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("Marca não encontrada.");
    }
    return result.rows[0];
};

const updateBrand = async (id, name, photo) => {
    const result = await pool.query(
        "UPDATE brands SET name = $1, photo = $2 WHERE id = $3 RETURNING *",
        [name, photo, id]
    );
    if (result.rowCount === 0) {
        throw new Error("Marca não encontrada para atualização.");
    }
    return result.rows[0];
};

const deleteBrand = async (id) => {
    const result = await pool.query("DELETE FROM brands WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        throw new Error("Marca não encontrada para exclusão.");
    }
    return { message: "Marca deletada com sucesso." };
};

module.exports = { getBrands,createBrand, getBrandById, updateBrand, deleteBrand };