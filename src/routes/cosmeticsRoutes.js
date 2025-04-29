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
 *     summary: Lista todos os cosméticos
 *     tags: [Cosmetics]
 *     responses:
 *       200:
 *         description: Lista de cosméticos
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