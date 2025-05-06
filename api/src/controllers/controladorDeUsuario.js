const servicoDeUsuario = require("../services/servicoDeUsuario");

class ControladorDeUsuario {
  pegarTodos(_req, res) {
    const usuarios = servicoDeUsuario.buscarTodos();

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ messagem: "Nenhum usuário foi encontrado." });
    }

    res.status(200).json(usuarios);
  }

  cadastrar(req, res) {
    const { nome, email, cpf, senha } = req.body;

    if ((!nome || !email || !cpf, !senha)) {
      return res
        .status(400)
        .json({ messagem: "Todos os campos são obrigatórios." });
    }

    const usuario = servicoDeUsuario.cadastrar(nome, email, cpf, senha);

    res.status(201).json(usuario);
  }
}

module.exports = new ControladorDeUsuario();
