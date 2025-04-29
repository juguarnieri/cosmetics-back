const PDFDocument = require("pdfkit");
const brandModel = require("../models/brandsModel");
const cosmeticModel = require("../models/cosmeticsModel");

const exportBrandsPDF = async (req, res) => {
    try {
        const brands = await brandModel.getBrands();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=brands.pdf");

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res);

        // Título do relatório
        doc.fontSize(18).font("Helvetica-Bold").text("Relatório de Marcas", { align: "center" });
        doc.moveDown(1);

        // Cabeçalho da tabela
        doc.fontSize(12).font("Helvetica-Bold");
        doc.text("ID", 50, doc.y, { width: 50, align: "left" });
        doc.text("Nome", 100, doc.y, { width: 200, align: "left" });
        doc.text("Foto", 300, doc.y, { width: 250, align: "left" });
        doc.moveDown(0.5);
        doc.strokeColor("#000").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.5);

        // Dados da tabela
        doc.font("Helvetica").fontSize(10);
        brands.forEach((brand) => {
            doc.text(brand.id, 50, doc.y, { width: 50, align: "left" });
            doc.text(brand.name, 100, doc.y, { width: 200, align: "left" });
            doc.text(brand.photo, 300, doc.y, { width: 250, align: "left" });
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de marcas:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF de marcas." });
    }
};

const exportCosmeticsPDF = async (req, res) => {
    try {
        const cosmetics = await cosmeticModel.getAllCosmetics();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=cosmetics.pdf");

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res);

        // Título do relatório
        doc.fontSize(18).font("Helvetica-Bold").text("Relatório de Cosméticos", { align: "center" });
        doc.moveDown(1);

        // Cabeçalho da tabela
        doc.fontSize(12).font("Helvetica-Bold");
        doc.text("ID", 50, doc.y, { width: 50, align: "left" });
        doc.text("Nome", 100, doc.y, { width: 100, align: "left" });
        doc.text("Produto", 200, doc.y, { width: 100, align: "left" });
        doc.text("Cor", 300, doc.y, { width: 50, align: "left" });
        doc.text("Tipo", 350, doc.y, { width: 50, align: "left" });
        doc.text("Preço", 400, doc.y, { width: 50, align: "left" });
        doc.text("Marca", 450, doc.y, { width: 100, align: "left" });
        doc.moveDown(0.5);
        doc.strokeColor("#000").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.5);

        // Dados da tabela
        doc.font("Helvetica").fontSize(10);
        cosmetics.forEach((cosmetic) => {
            doc.text(cosmetic.id, 50, doc.y, { width: 50, align: "left" });
            doc.text(cosmetic.name, 100, doc.y, { width: 100, align: "left" });
            doc.text(cosmetic.product, 200, doc.y, { width: 100, align: "left" });
            doc.text(cosmetic.color, 300, doc.y, { width: 50, align: "left" });
            doc.text(cosmetic.type, 350, doc.y, { width: 50, align: "left" });
            doc.text(cosmetic.price, 400, doc.y, { width: 50, align: "left" });
            doc.text(cosmetic.brand_name, 450, doc.y, { width: 100, align: "left" });
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de cosméticos:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF de cosméticos." });
    }
};

module.exports = { exportBrandsPDF, exportCosmeticsPDF };