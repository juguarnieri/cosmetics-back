const PDFDocument = require("pdfkit");
const brandModel = require("../models/brandsModel");
const cosmeticModel = require("../models/cosmeticsModel");

// Exporta marcas em PDF
const exportBrandsPDF = async (req, res) => {
    try {
        const brands = await brandModel.getBrands();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=brands.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Relatório de Marcas", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text("Id | Nome | Foto", { underline: true });
        doc.moveDown(0.5);

        brands.forEach((brand) => {
            doc.text(`${brand.id} | ${brand.name} | ${brand.photo}`);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de marcas." });
    }
};

// Exporta cosméticos em PDF
const exportCosmeticsPDF = async (req, res) => {
    try {
        const cosmetics = await cosmeticModel.getAllCosmetics();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=cosmetics.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Relatório de Cosméticos", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text("Id | Nome | Produto | Cor | Tipo | Preço | Marca", { underline: true });
        doc.moveDown(0.5);

        cosmetics.forEach((cosmetic) => {
            doc.text(`${cosmetic.id} | ${cosmetic.name} | ${cosmetic.product} | ${cosmetic.color} | ${cosmetic.type} | ${cosmetic.price} | ${cosmetic.brand_name}`);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de cosméticos." });
    }
};

module.exports = { exportBrandsPDF, exportCosmeticsPDF };