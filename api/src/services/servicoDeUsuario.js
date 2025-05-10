const { Usuario } = require("../models/Usuario");
const { HttpError } = require("../errors/httpError");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const jwt = require("jsonwebtoken");
const z = require("zod");

class ServicoDeUsuario {
  buscarTodos() {
    return RepositorioDeUsuario.buscarTodos();
  }

  cadastrar(nome, email, cpf, senha) {
    const usuarioSchema = z.object({
      nome: z.string({required_error: "O nome é obrigatório, e tem que ser uma string"}).trim().min(3), 
      email: z.string().email({ message: "O email não é valido!"}),
      cpf: z.string().trim().min(11),
      senha: z.string().trim().min(8),
    });

    const validacao = usuarioSchema.safeParse({ nome, email, cpf, senha})
    if (validacao.success === false){
      return validacao.error.format();
    }

    const usuario = new Usuario(nome, email, cpf, senha);
    return RepositorioDeUsuario.criar(usuario);
  }

  conectar(email, senha) {
    // Verifica se o usuário existe
    const usuarioExistente = RepositorioDeUsuario.pegarPeloEmail(email);

    // Retorna um erro, se não existir
    if (!usuarioExistente){
      throw new HttpError(404, "Usuário inexistente");
    }

    // Verifica senha
    const autenticado = usuarioExistente.compararSenha(senha);
    
    // Retorna um erro, se não bater
    if (!autenticado) {
      throw new Error(401, "Senha incorreta");
    }

    // Gera o token, salva, e reotrna para o usuário
    const token = jwt.sign({ id: usuarioExistente.id}, "secretjgjun", {
      expiresIn: "1d"
    });

    // Retorna o token
    return token;
  }
}

module.exports = new ServicoDeUsuario();
