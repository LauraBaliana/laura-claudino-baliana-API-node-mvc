const usuarioModel = require("../models/usuarioModel");

// Camada Controller: valida a entrada, chama o Model e responde em JSON.

function validarUsuario(body) {
  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!nome || !email) {
    return { erro: "Os campos nome e email são obrigatórios." };
  }

  return { nome, email };
}

function validarId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function criar(req, res) {
  try {
    const dados = validarUsuario(req.body);
    if (dados.erro) {
      return res.status(400).json({ erro: dados.erro });
    }

    const id = await usuarioModel.criar(dados);

    return res.status(201).json({
      id,
      nome: dados.nome,
      email: dados.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao inserir usuário." });
  }
}

async function listar(req, res) {
  try {
    const usuarios = await usuarioModel.listar();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar usuários." });
  }
}

async function atualizar(req, res) {
  try {
    const id = validarId(req.params.id);
    if (!id) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const dados = validarUsuario(req.body);
    if (dados.erro) {
      return res.status(400).json({ erro: dados.erro });
    }

    const atualizado = await usuarioModel.atualizar(id, dados);
    if (!atualizado) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.status(200).json({
      id,
      nome: dados.nome,
      email: dados.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
}

async function remover(req, res) {
  try {
    const id = validarId(req.params.id);
    if (!id) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const removido = await usuarioModel.remover(id);
    if (!removido) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.status(200).json({ mensagem: "Usuário removido com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao excluir usuário." });
  }
}

module.exports = { criar, listar, atualizar, remover };
