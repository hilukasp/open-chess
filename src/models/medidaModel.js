var database = require("../database/config");

function buscarUltimasMedidas(idUsuario) {
    //mostra todos os usuarios e o flashcards atrelado a ela
    var instrucaoSql = `select jogador.* , historico.* from user jogador 
    inner join posicao_flashcard historico on jogador.id=historico.id_user 
    where jogador.id=${idUsuario} order by revisao desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idUsuario) {
    //mostra as respectivas aberturas e soma os corretos
    var instrucaoSql = `select 
    abertura.nome_categoria,
    sum(case when historico.correto = true then 1 else 0 end) as correto 
    from posicao_flashcard historico inner join posicao_chess abertura 
    on historico.id_posicao = abertura.id
    where historico.id_user = ${idUsuario}
    group by abertura.nome_categoria;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//     select posicao_flashcard.* ,posicao_chess.nome_categoria from user 
// join posicao_flashcard on user.id=posicao_flashcard.id_user
// join posicao_chess on posicao_flashcard.id_posicao=posicao_chess.id where user.id=${idUsuario}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
