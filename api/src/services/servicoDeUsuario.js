const { Usuario } = require("../models/Usuario");
const repositorioDeUsuario = require("../repositories/repositorioDeUsuario");

exports.buscarTodos = async () => await repositorioDeUsuario.buscarTodos();

exports.criar = async (nome, email, cpf, senha) => {
  const usuario = await Usuario.criar(nome, email, cpf, senha);
  return await repositorioDeUsuario.criar(usuario);
};
