const brandModel = require("../models/brandsModel");

const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const photo = req.file ? req.file.filename : req.body.photo;

        if (!name || !photo) {
            return res.status(400).json({ message: "Os campos 'name' e 'photo' são obrigatórios." });
        }

        const newBrand = await brandModel.createBrand(name, photo);
        res.status(201).json(newBrand);
    } catch (error) {
        console.error("Erro ao criar marca:", error);
        res.status(500).json({ message: "Erro ao criar marca." });
    }
};

module.exports = { createBrand };
const getAllBrands = async (req, res) => {
    try {
        const brands = await brandModel.getBrands();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar marcas." });
    }
};

const getBrand = async (req, res) => {
    try {
        const brand = await brandModel.getBrandById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Marca não encontrada." });
        }
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar marca." });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { name, photo } = req.body;
        const updatedBrand = await brandModel.updateBrand(req.params.id, name, photo);
        if (!updatedBrand) {
            return res.status(404).json({ message: "Marca não encontrada." });
        }
        res.json(updatedBrand);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar marca." });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const message = await brandModel.deleteBrand(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar marca." });
    }
    
};

const uploadBrandImage = async (req, res) => {
    try {
        const { name } = req.body;
        const photo = req.file ? req.file.filename : null;

        if (!photo) {
            return res.status(400).json({ message: "Nenhuma imagem foi enviada!" });
        }

        // Aqui você pode salvar as informações no banco de dados, se necessário
        res.status(200).json({
            message: "Upload realizado com sucesso!",
            data: {
                name,
                photoUrl: `/uploads/${photo}`,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer upload da imagem." });
    }
};
module.exports = {createBrand, getAllBrands, uploadBrandImage, getBrand,  updateBrand, deleteBrand };