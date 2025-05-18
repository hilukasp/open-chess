var express = require("express");
var router = express.Router();

var flashController = require("../controllers/flashController");

router.get("/listar", function (req, res) {
    flashController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    flashController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    flashController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    flashController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    flashController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    flashController.deletar(req, res);
});

module.exports = router;