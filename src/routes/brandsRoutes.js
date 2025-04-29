const express = require("express");
const router = express.Router();
const upload = require("../config/upload"); // Apenas uma declaração
const brandController = require("../controllers/brandsController");
const apiKeyMiddleware = require("../config/apiKey"); // 🔐

// Aplica o middleware de chave de API para todas as rotas
router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Gerenciamento de marcas
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Lista todas as marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas
 */
router.get("/brands", brandController.getAllBrands);

/**
 * @swagger
 * /api/brands/upload:
 *   post:
 *     summary: Faz o upload de uma imagem para uma marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da marca
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *       400:
 *         description: Erro no upload
 */
router.post("/brands/upload", upload.single("photo"), brandController.uploadBrandImage);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Busca marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       404:
 *         description: Marca não encontrada
 */
router.get("/brands/:id", brandController.getBrand);

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Cria uma nova marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marca criada
 */
router.post("/brands", upload.single("photo"), brandController.createBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Atualiza uma marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Marca atualizada
 */
router.put("/brands/:id", brandController.updateBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Deleta uma marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marca deletada
 */
router.delete("/brands/:id", brandController.deleteBrand);

module.exports = router;