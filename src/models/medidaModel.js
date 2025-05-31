var database = require("../database/config");

function buscarUltimasMedidas(idUsuario) {

    var instrucaoSql = `select jogador.* , historico.* from user jogador 
    inner join posicao_flashcard historico on jogador.id=historico.id_user 
    where jogador.id=${idUsuario} order by revisao desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idUsuario) {

    var instrucaoSql = `select 
  abertura.nome_categoria,
  sum(case when historico.correto = true then 1 else 0 end) as correto 
from posicao_flashcard historico inner join posicao_chess abertura 
on historico.id_posicao = abertura.id
where historico.id_user = ${idUsuario}
group by abertura.nome_categoria;
 `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
