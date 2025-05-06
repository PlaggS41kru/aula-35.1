const { Usuario } = require("../models/Usuario");

class RepositorioDeUsuario {
  buscarTodos() {
    return Usuario.buscarTodos();
  }

  criar(usuario) {
    return usuario.salvar();
  }
}

module.exports = new RepositorioDeUsuario();
