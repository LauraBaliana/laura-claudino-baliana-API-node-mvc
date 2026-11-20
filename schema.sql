CREATE DATABASE IF NOT EXISTS api_usuarios
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE api_usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO usuarios (nome, email) VALUES
  ('Ana Souza', 'ana.souza@email.com'),
  ('Carlos Lima', 'carlos.lima@email.com'),
  ('Laura Claudino Baliana', 'laura.baliana@email.com');
