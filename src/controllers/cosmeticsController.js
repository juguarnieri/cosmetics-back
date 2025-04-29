const cosmeticsModel = require("../models/cosmeticsModel");

const getAllCosmetics = async (req, res) => {
    try {
        const { product } = req.query; 
        console.log("🔎 Valor recebido de 'product':", product);

        let cosmetics;

        if (product) {
            cosmetics = await cosmeticsModel.getAllCosmetics(product);
        } else {
            cosmetics = await cosmeticsModel.getAllCosmetics();
        }

        res.status(200).json({
            message: "Lista de cosméticos recuperada com sucesso.",
            data: cosmetics,
        });
    } catch (error) {
        console.error("Erro ao buscar cosméticos:", error);
        res.status(500).json({ message: "Erro ao buscar cosméticos." });
    }
};

const getCosmeticById = async (req, res) => {
    try {
        const { id } = req.params; 

        const cosmetic = await cosmeticsModel.getCosmeticById(id);

        if (!cosmetic) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }

        res.status(200).json({
            message: "Cosmético encontrado com sucesso.",
            data: cosmetic,
        });
    } catch (error) {
        console.error("Erro ao buscar cosmético:", error);
        res.status(500).json({ message: "Erro ao buscar cosmético." });
    }
};


const getUserCosmetics = async (req, res) => {
    try {
        const cosmetics = await cosmeticModel.getCosmeticsByUserId(req.params.userId);
        res.json(cosmetics);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar cosméticos do usuário." });
    }
};

const createCosmetic = async (req, res) => {
    try {
        const { name, product, color, type, price, brand_id } = req.body;

        if (!name || !product || !color || !type || !price || !brand_id) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const newCosmetic = await cosmeticsModel.createCosmetic(
            name,
            product,
            color,
            type,
            parseFloat(price), 
            brand_id
        );

        res.status(201).json({
            message: "Cosmético criado com sucesso.",
            data: newCosmetic,
        });
    } catch (error) {
        console.error("Erro ao criar cosmético:", error);
        res.status(500).json({ message: "Erro ao criar cosmético." });
    }
};

const updateCosmetic = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, product, color, type, price, brand_id } = req.body;

        if (!name || !product || !color || !type || !price || !brand_id) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const updatedCosmetic = await cosmeticsModel.updateCosmetic(
            id,
            name,
            product,
            color,
            type,
            parseFloat(price), 
            brand_id
        );

        res.status(200).json({
            message: "Cosmético atualizado com sucesso.",
            data: updatedCosmetic,
        });
    } catch (error) {
        console.error("Erro ao atualizar cosmético:", error);
        res.status(500).json({ message: "Erro ao atualizar cosmético." });
    }
};

const deleteCosmetic = async (req, res) => {
    try {
        const message = await cosmeticsModel.deleteCosmetic(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar cosmético." });
    }
};
const getCosmeticsByBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const cosmetics = await brandModel.getCosmeticsByBrandId(brandId);

        if (!cosmetics || cosmetics.length === 0) {
            return res.status(404).json({ message: "Nenhum cosmético encontrado para esta marca." });
        }

        res.json(cosmetics);
    } catch (error) {
        console.error("Erro ao buscar cosméticos da marca:", error);
        res.status(500).json({ message: "Erro ao buscar cosméticos da marca." });
    }
};
module.exports = { getAllCosmetics, getCosmeticsByBrand,  getCosmeticById, getUserCosmetics, createCosmetic, updateCosmetic, deleteCosmetic };