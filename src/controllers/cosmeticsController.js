const cosmeticsModel = require("../models/cosmeticsModel");

const getAllCosmetics = async (req, res) => {
    try {
        const { product } = req.query; // Obtém o filtro de produto da query string
        console.log("🔎 Valor recebido de 'product':", product);

        let cosmetics;

        if (product) {
            // Busca apenas cosméticos filtrados por produto
            cosmetics = await cosmeticsModel.getAllCosmetics(product);
        } else {
            // Busca todos os cosméticos
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
        const cosmetic = await cosmeticModel.getCosmeticById(req.params.id);
        if (!cosmetic) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }
        res.json(cosmetic);
    } catch (error) {
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
        if (!brand_id) {
            return res.status(400).json({ message: "O campo brand_id é obrigatório." });
        }
        const newCosmetic = await cosmeticModel.createCosmetic(name, product, color, type, price, brand_id);
        res.status(201).json(newCosmetic);
    } catch (error) {
        console.error("Erro ao criar cosmético:", error);
        res.status(500).json({ message: "Erro ao criar cosmético." });
    }
};

const updateCosmetic = async (req, res) => {
    try {
        const { name, product, color, type, price, brand_id } = req.body;
        const updatedCosmetic = await cosmeticModel.updateCosmetic(req.params.id, name, product, color, type, price, brand_id);
        if (!updatedCosmetic) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }
        res.json(updatedCosmetic);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cosmético." });
    }
};

const deleteCosmetic = async (req, res) => {
    try {
        const message = await cosmeticModel.deleteCosmetic(req.params.id);
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