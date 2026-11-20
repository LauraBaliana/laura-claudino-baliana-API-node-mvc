const pool = require("../config/db");

// Camada Model: único lugar onde existem instruções SQL.

async function criar({ nome, email }) {
  const [result] = await pool.execute(
    "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
    [nome, email]
  );
  return result.insertId;
}

async function listar() {
  const [rows] = await pool.execute(
    "SELECT id, nome, email FROM usuarios ORDER BY id"
  );
  return rows;
}

// Retorna true se algum registro foi atualizado.
async function atualizar(id, { nome, email }) {
  const [result] = await pool.execute(
    "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
    [nome, email, id]
  );
  return result.affectedRows > 0;
}

// Retorna true se algum registro foi removido.
async function remover(id) {
  const [result] = await pool.execute("DELETE FROM usuarios WHERE id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
}

module.exports = { criar, listar, atualizar, remover };
