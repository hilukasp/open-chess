var board = null

/*var posicoes = [
  {
    id: 1,
    posicao: 'r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',
    nome_categoria: 'Italiana',
    resposta: 'Qb3',
    orientacao:'White'
  },
  {
    id: 2,
    posicao: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    nome_categoria: 'Ruy Lopez',
    resposta: 'O-O',
    orientacao:'White'
  },
  {
    id: 3,
    posicao: 'r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6',
    nome_categoria: 'Francesa',
    resposta: 'Bd7',
    orientacao:'black',
  },
  {
    id: 4,
    posicao: 'r1bqkbnr/pp3ppp/2n1p3/1BppP3/3P4/5N2/PPP2PPP/RNBQK2R b KQkq - 3 5',
    nome_categoria: 'Francesa',
    resposta: 'Qb6',
    orientacao:'black',
  },
  {
    id: 5,
    posicao: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    nome_categoria: 'Italiana',
    resposta: 'd3',
    orientacao:'white'
  },
]*/
// var posicao ='r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
var game = new Chess()
var max = 4
var min = 0
var random = Math.random() * (max - min + 1) + min
var numeroaleatorio = parseInt(random)
// var numeroaleatorio=1
var correto
console.log(numeroaleatorio)
console.log(random)

var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
var primeiratentativa = true //tentativa para registrar no banco



function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over

  if (game.game_over()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  console.log(move)



  // illegal move
  if (move === null) return 'snapback'


  if (move.san == posicoes[numeroaleatorio].resposta) {
    vez.style.color = 'black';
    vez.style.backgroundColor = 'rgb(96, 255, 117)';
    descricao.innerHTML = `<h1>Muito bem! Continue assim</h1>`
    vez.innerHTML = '<h1>Você acertou</h1>'
    variantes.innerHTML = ``
    // setTimeout(() => updateStatus(), 5000)
    if (primeiratentativa) {
      // faça a inserção no banco
      correto = true
      publicar(correto)
      primeiratentativa = false
    }

    setTimeout(() => window.location.reload(), 1500)
  } else {
    console.log('nao entroi')
    vez.style.color = 'black';
    vez.style.backgroundColor = 'rgb(206, 0, 0)';
    descricao.innerHTML = `<h1>Resposta errada...</h1>`
    variantes.innerHTML = `
    <button onclick="refazer()">Refazer</button>
    <button onclick="resposta()">Mostrar resposta</button>
    `
    if (primeiratentativa) {
      //inserção no banco
      correto = false
      publicar(correto)
      primeiratentativa = false
    }
  }
  // updateStatus()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {

  board.position(game.fen())

}

function updateStatus() {
  var status = ''

  var moveColor = 'white'
  vez.style.color = 'black';
  vez.style.backgroundColor = 'white';
  vez.innerHTML = '<h1>Vez das brancas</h1>'

  if (game.turn() === 'b') {
    vez.style.color = 'white';
    vez.style.backgroundColor = 'black';
    vez.innerHTML = '<h1>Vez das pretas</h1>'
    moveColor = 'black'
  }


  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}

// console.log(posicoes[numeroaleatorio].orientacao)


function refazer() {
  game.undo(); // desfaz o movimento
  board.position(game.fen()); // atualiza o tabuleiro com o novo FEN
  updateStatus()
}
//mostra a resposta
function resposta() {
  game.undo(); // desfaz o movimento
  board.position(game.fen()); // atualiza o tabuleiro com o novo FEN
  setTimeout(() => {

    game.move(`${posicoes[numeroaleatorio].resposta}`)
    // game.move(`Qb6`)
    board.position(game.fen());
    updateStatus()

    vez.style.color = 'black';
    vez.style.backgroundColor = 'rgb(96, 255, 117)';
    descricao.innerHTML = `<h1>Muito bem! Continue assim</h1>`
    vez.innerHTML = '<h1>Você acertou</h1>'
    variantes.innerHTML = ``
    setTimeout(() => { window.location.reload() }, 2000)
  }, 1000)


}
function configuracao() {
  console.log(posicoes)
  game = new Chess(`${posicoes[numeroaleatorio].posicao}`)

  console.log(posicoes[numeroaleatorio].posicao)
  descricao.innerHTML = `<h3>Abertura: ${posicoes[numeroaleatorio].nome_categoria}</h3>`

  var config = {
    draggable: true,
    position: `${posicoes[numeroaleatorio].posicao}`,
    orientation: `${posicoes[numeroaleatorio].orientacao}`,
    // orientation:`${posicoes[numeroaleatorio].orientacao}`,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd


  }
  board = Chessboard('myBoard', config)
  
updateStatus()
}


function publicar(booleano) {
  var idUsuario = sessionStorage.ID_USUARIO;
  if (!idUsuario) {
    console.log('user não registrado')
    return
  }

  var corpo = {
    correto: booleano,
    id_posicao: posicoes[numeroaleatorio].id
  }

  fetch(`/flash/publicar/${idUsuario}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(corpo)
  }).then(function (resposta) {

    console.log("resposta: ", resposta);

    if (resposta.ok) {
 


    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);

  });

  return false;

}
var posicoes
function listarposicoes() {

  fetch("/flash/listar").then(function (resposta) {
    if (resposta.ok) {
      if (resposta.status == 204) {
        alert('nenhuma posicao registrada')
      }

      resposta.json().then(function (resposta) {
        // console.log("Dados recebidos: ", JSON.stringify(resposta));
        // console.log(resposta[2].orientacao)

        posicoes = resposta

        configuracao()
      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);
    finalizarAguardar();
  });
}