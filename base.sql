-- 1. Creación y uso de la Base de Datos
CREATE DATABASE tianguis_stock;
GO
USE tianguis_stock;
GO

-- =========================================================
-- 2. CREACIÓN DE TABLAS
-- =========================================================

-- Tabla de catálogo fijo para las categorías
CREATE TABLE categorias_catalogo (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de comerciantes (apunta al ID de la categoría)
CREATE TABLE comerciantes (
    id_comerciante INT IDENTITY(1,1) PRIMARY KEY,
    nombre_puesto VARCHAR(100) NOT NULL,
    nombre_comerciante VARCHAR(100) NOT NULL,
    id_categoria INT NOT NULL,
    password VARCHAR(255) NOT NULL, -- Espacio suficiente para el hash del Back-end
    
    CONSTRAINT fk_categoria_catalogo
        FOREIGN KEY (id_categoria) 
        REFERENCES categorias_catalogo(id_categoria)
);

-- Tabla de productos con validaciones numéricas y estrella de destacados
CREATE TABLE productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    
    -- Candado: No permite precios menores a 0
    precio DECIMAL(10,2) NOT NULL CONSTRAINT chk_precio_positivo CHECK (precio >= 0),
    
    -- Candado: No permite inventario menor a 0
    stock INT NOT NULL CONSTRAINT chk_stock_positivo CHECK (stock >= 0),
    
    -- Atributo booleano para la estrella (0 = normal, 1 = destacado)
    destacado BIT NOT NULL DEFAULT 0,
    
    id_comerciante INT NOT NULL,
    CONSTRAINT fk_comerciante
        FOREIGN KEY (id_comerciante) 
        REFERENCES comerciantes(id_comerciante)
        ON DELETE CASCADE -- Si se borra el puesto, se borran sus productos automáticamente
);
GO

-- =========================================================
-- 3. INSERCIÓN DE DATOS INICIALES (CATÁLOGO)
-- =========================================================

INSERT INTO categorias_catalogo (nombre_categoria) VALUES 
('Canasta Básica y Alimentos sin procesar'),
('Comidas, Bebidas y Antojitos'),
('Artículos del Hogar y Herramientas'),
('Ropa, Calzado y Textiles'),
('Novedades, Electrónica y Chácharas');
GO