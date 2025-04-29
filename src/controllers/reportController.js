const PDFDocument = require("pdfkit");
const brandModel = require("../models/brandsModel");
const cosmeticModel = require("../models/cosmeticsModel");

const addTableHeader = (doc, headers, positions, widths) => {
    const initialY = doc.y;
    doc.fontSize(12).font("Helvetica-Bold");

    headers.forEach((text, i) => {
        doc.text(text, positions[i], initialY, {
            width: widths[i],
            align: "left",
            ellipsis: true,
            lineBreak: false
        });
    });

    doc.moveTo(50, initialY + 15).lineTo(550, initialY + 15).stroke();
    doc.y = initialY + 20; 
};

const addTableRow = (doc, data, positions, widths) => {
    const rowHeight = 15;
    const initialY = doc.y;

    doc.font("Helvetica").fontSize(10);
    data.forEach((text, i) => {
        doc.text(String(text), positions[i], initialY, {
            width: widths[i],
            align: "left",
            ellipsis: true,
            lineBreak: false
        });
    });

    doc.y = initialY + rowHeight;
};

const initializePDF = (res, title, filename) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);
    doc.fontSize(18).font("Helvetica-Bold").text(title, { align: "center" });
    doc.moveDown(1);
    return doc;
};

const exportBrandsPDF = async (req, res) => {
    try {
        const brands = await brandModel.getBrands();
        const doc = initializePDF(res, "Relatório de Marcas", "brands.pdf");

        const headers = ["ID", "Nome", "Foto"];
        const positions = [50, 120, 300];
        const widths = [50, 160, 200];

        addTableHeader(doc, headers, positions, widths);

        brands.forEach((brand) => {
            const row = [brand.id, brand.name, brand.photo];
            addTableRow(doc, row, positions, widths);
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
        const doc = initializePDF(res, "Relatório de Cosméticos", "cosmetics.pdf");

        const headers = ["ID", "Nome", "Produto", "Cor", "Tipo", "Preço", "Marca"];
        const positions = [50, 90, 190, 290, 350, 410, 470];
        const widths =   [40, 90, 90,   50,  50,  50,  100];

        addTableHeader(doc, headers, positions, widths);

        cosmetics.forEach((cosmetic) => {
            const row = [
                cosmetic.id,
                cosmetic.name,
                cosmetic.product,
                cosmetic.color,
                cosmetic.type,
                `R$ ${cosmetic.price}`,
                cosmetic.brand_name
            ];
            addTableRow(doc, row, positions, widths);
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de cosméticos:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF de cosméticos." });
    }
};

module.exports = { exportBrandsPDF, exportCosmeticsPDF };
