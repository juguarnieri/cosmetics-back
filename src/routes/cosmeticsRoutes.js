const express = require("express");
const router = express.Router();
const cosmeticController = require("../controllers/cosmeticsController");
const apiKeyMiddleware = require("../config/apiKey"); // 🔐
router.use(apiKeyMiddleware); // 🔒 Aplica para todas as rotas abaixo

/**
 * @swagger
 * tags:
 *   name: Cosmetics
 *   description: Gerenciamento de cosméticos
 */

/**
 * @swagger
 * /api/cosmetics:
 *   get:
 *     summary: Lista todos os cosméticos ou filtra por produto
 *     tags: [Cosmetics]
 *     parameters:
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         required: false
 *         description: Nome do produto para filtrar os cosméticos (opcional)
 *     responses:
 *       200:
 *         description: Lista de cosméticos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do cosmético
 *                       name:
 *                         type: string
 *                         description: Nome do cosmético
 *                       product:
 *                         type: string
 *                         description: Tipo de produto
 *                       color:
 *                         type: string
 *                         description: Cor do cosmético
 *                       type:
 *                         type: string
 *                         description: Tipo do cosmético
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: Preço do cosmético
 *                       brand_name:
 *                         type: string
 *                         description: Nome da marca associada
 *       500:
 *         description: Erro ao buscar cosméticos
 */
router.get("/cosmetics", cosmeticController.getAllCosmetics);

/**
 * @swagger
 * /api/cosmetics/{id}:
 *   get:
 *     summary: Busca cosmético por ID
 *     tags: [Cosmetics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cosmético encontrado
 *       404:
 *         description: Cosmético não encontrado
 */
router.get("/cosmetics/:id", cosmeticController.getCosmeticById);

/**
 * @swagger
 * /api/cosmetics/brand/{brandId}:
 *   get:
 *     summary: Lista cosméticos de uma marca
 *     tags: [Cosmetics]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de cosméticos da marca
 */
router.get("/cosmetics/brand/:brandId", cosmeticController.getUserCosmetics);

/**
 * @swagger
 * /api/cosmetics:
 *   post:
 *     summary: Cria um novo cosmético
 *     tags: [Cosmetics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               product:
 *                 type: string
 *               color:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               brand_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cosmético criado
 */
router.post("/cosmetics", cosmeticController.createCosmetic);

/**
 * @swagger
 * /api/cosmetics/{id}:
 *   put:
 *     summary: Atualiza um cosmético
 *     tags: [Cosmetics]
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
 *               product:
 *                 type: string
 *               color:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               brand_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cosmético atualizado
 */
router.put("/cosmetics/:id", cosmeticController.updateCosmetic);

/**
 * @swagger
 * /api/cosmetics/{id}:
 *   delete:
 *     summary: Deleta um cosmético
 *     tags: [Cosmetics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cosmético deletado
 */
router.delete("/cosmetics/:id", cosmeticController.deleteCosmetic);

module.exports = router;