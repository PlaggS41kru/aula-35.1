const usuarios = [
  { id: "hdhi4h24h12", nome: "Ada Lovelace" },
  { id: "3511235vcfe", nome: "Alan Turing" }
];

exports.buscarTodos = async () => usuarios;

exports.criar = async (usuario) => {
  usuarios.push(usuario);

  return usuario;
};
