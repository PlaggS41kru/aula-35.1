const { Usuario } = require("../models/Usuario");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");

class ServicoDeUsuario {
  buscarTodos() {
    return RepositorioDeUsuario.buscarTodos();
  }

  cadastrar(nome, email, cpf, senha) {
    const usuario = new Usuario(nome, email, cpf, senha);
    return RepositorioDeUsuario.criar(usuario);
  }
}

module.exports = new ServicoDeUsuario();
