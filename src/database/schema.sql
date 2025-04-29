CREATE DATABASE beleza;
\c beleza

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photo TEXT NOT NULL
);

CREATE TABLE cosmetics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    product VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    brand_id INTEGER REFERENCES brands(id) ON DELETE SET NULL 
);

INSERT INTO brands (name, photo) VALUES
('LOréal', 'url_foto_loreal'),
('Maybelline', 'url_foto_maybelline'),
('Natura', 'url_foto_natura'),
('Avon', 'url_foto_avon'),
('MAC', 'url_foto_mac');

INSERT INTO cosmetics (name, product, color, type, price, brand_id) VALUES
('Superstay Matte Ink', 'Batom', 'Vermelho', 'Matte', 29.99, 2),
('True Color', 'Base', 'Bege', 'Líquida', 49.90, 4),
('Aquarela', 'Sombra', 'Azul', 'Pó', 19.99, 3),
('Studio Fix', 'Pó Compacto', 'Bege Médio', 'Compacto', 89.90, 5),
('Revitalift', 'Creme Facial', 'Branco', 'Hidratante', 99.99, 1);