const bcrypt = require("bcrypt");

class Usuario {
  constructor(id, nome, email, cpf, senhaHash) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.senha = senhaHash;
  }

  static async criar(nome, email, cpf, senha) {
    const hash = await bcrypt.hash(senha, 10);
    const id = Math.random().toString(36).substring(2, 10);
    return new Usuario(id, nome, email, cpf, hash);
  }

  async compararSenha(senha) {
    return await bcrypt.compare(senha, this.senha);
  }
}

module.exports = { Usuario };
