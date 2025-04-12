const express = require("express");
const controladorDeUsuario = require("../controllers/controladorDeUsuario");
const rotasDeUsuario = express.Router();

rotasDeUsuario.get("/todos", controladorDeUsuario.pegarTodos);
rotasDeUsuario.post("/criar", controladorDeUsuario.criar);

module.exports = rotasDeUsuario;
