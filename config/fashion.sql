CREATE DATABASE fashion;
-- drop database fashion;
use fashion;

CREATE TABLE designer (
designer_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(60) NOT NULL,
lastname VARCHAR(60) NOT NULL,
description VARCHAR(200),
city VARCHAR(70) NOT NULL,
phone_number VARCHAR(25),
email VARCHAR(60) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
designer_is_del BOOLEAN NOT NULL DEFAULT 0,
designer_img VARCHAR(100)

);

CREATE TABLE design (
design_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
designer_id INT UNSIGNED NOT NULL,
genre VARCHAR(15) NOT NULL,
main_material VARCHAR(30) NOT NULL,d
main_color VARCHAR(20) NOT NULL,
garment VARCHAR(50),
description VARCHAR(200),
design_is_del BOOLEAN NOT NULL DEFAULT 0,
design_img VARCHAR(100),
CONSTRAINT fk_designer_id FOREIGN KEY (designer_id)
REFERENCES designer(designer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO designer (name, lastname, description, city, phone_number, email, password) VALUES ("Agatha", "Ruiz de la Prada", "Hace diseños muy coloridos", "Madrid", "655222333", "agatha@ruiz.com", "agatha");
INSERT INTO designer (name, lastname, description, city, phone_number, email, password) VALUES ("Pepita", "Flores", "Diseños inspirados en los 80", "Málaga", "677755588", "pepita@flores.com", "pepita");


INSERT INTO design (designer_id, genre, main_material, main_color, garment, description) VALUES (1, "Mujer", "Cashmere", "Amarillo", "Chaqueta", "Chaqueta con corazones gigantes");
INSERT INTO design (designer_id, genre, main_material, main_color, garment, description) VALUES (2, "Hombre", "Algodón", "Azul", "Camiseta", "Pantalón estilo cargo");
INSERT INTO design (designer_id, genre, main_material, main_color, garment, description) VALUES (2, "Mujer", "Poliéster", "Negro", "Jersey", "Jersey estilo cut-out");


select * from designer;
select * from design;

select d.name, d.lastname, de.design_id, de.garment from designer d, design de where d.designer_id = de.designer_id;

select de.garment, d.name from design de, designer d where d.designer_id = de.designer_id;
