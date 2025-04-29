const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentação da API para gerenciamento de marcas e cosméticos",
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key", // Nome do cabeçalho onde a chave será enviada
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [], // Aplica o esquema de segurança globalmente
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Caminho para os arquivos de rotas com anotações do Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;