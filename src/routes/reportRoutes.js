const express = require("express");
const router = express.Router();
const {
    exportBrandsPDF,
    exportCosmeticsPDF
} = require("../controllers/reportController");

const apiKeyMiddleware = require("../config/apiKey"); // 🔐

router.use(apiKeyMiddleware); // 🔒 Aplica para todas as rotas abaixo

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Rotas para exportação de relatórios
 */

/**
 * @swagger
 * /api/reports/brands/export/pdf:
 *   get:
 *     summary: Exporta marcas em PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o PDF
 */
router.get("/brands/export/pdf", exportBrandsPDF);

/**
 * @swagger
 * /api/reports/cosmetics/export/pdf:
 *   get:
 *     summary: Exporta cosméticos em PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o PDF
 */
router.get("/cosmetics/export/pdf", exportCosmeticsPDF);

module.exports = router;