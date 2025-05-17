var board = null

var posicoes = [
  {
    id_posicao: 1,
    posicao: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
    nome_categoria: 'Abertura',
    resposta: 'e4'
  },
  {
    id_posicao: 2,
    posicao: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R',
    nome_categoria: 'Defesa',
    resposta: 'Nf3'
  },
  {
    id_posicao: 3,
    posicao: 'rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R',
    nome_categoria: 'Tática',
    resposta: 'Nc3'
  },
  {
    id_posicao: 4,
    posicao: 'r1bqkbnr/pp3ppp/2n1p3/1BppP3/3P4/5N2/PPP2PPP/RNBQK2R b KQkq - 3 5',
    nome_categoria: 'Francesa',
    resposta: 'Qb6'
  },
  {
    id_posicao: 5,
    posicao: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    nome_categoria: 'Italiana',
    resposta: 'd3'
  }
]
// var posicao ='r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
var game = new Chess(`${posicoes[3].posicao}`) 
var $status = $('#status') 
var $fen = $('#fen')
var $pgn = $('#pgn') 
// parseInt(Math.random() * (5 - 1) + 1)
var primeiratentativa=true //tentativa para registrar no banco


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
  
 
  if (move.san==posicoes[3].resposta) { 
    vez.style.color='black';
    vez.style.backgroundColor='rgb(96, 255, 117)';
        descricao.innerHTML=`<h1>Muito bem! Continue assim</h1>`
    vez.innerHTML='<h1>Você acertou</h1>' 
    variantes.innerHTML=``
    // setTimeout(() => updateStatus(), 5000)
    if (primeiratentativa) {
      // faça a inserção no banco
      primeiratentativa=false
    }
    
    setTimeout(() => window.location.reload(), 1500)
  }else{
    console.log('nao entroi')
    vez.style.color='black';
    vez.style.backgroundColor='rgb(206, 0, 0)';
    descricao.innerHTML=`<h1>Resposta errada...</h1>`
    variantes.innerHTML=`
    <button onclick="refazer()">Refazer</button>
    <button onclick="resposta()">Mostrar resposta</button>
    `
    if (primeiratentativa) {
      //inserção no banco
      primeiratentativa=false
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

  var moveColor = 'White'
  vez.style.color='black';
    vez.style.backgroundColor='white';
    vez.innerHTML='<h1>Vez das brancas</h1>' 

  if (game.turn() === 'b') {
    vez.style.color='white';
    vez.style.backgroundColor='black';
    vez.innerHTML='<h1>Vez das pretas</h1>'
    moveColor = 'Black'
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
 


var config = {
  draggable: true,
  position: `${posicoes[3].posicao}`,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
  
  
}

function refazer() {
  game.undo(); // desfaz o movimento
  board.position(game.fen()); // atualiza o tabuleiro com o novo FEN
  updateStatus()        
}
//mostra a resposta
function resposta() {
  game.undo(); // desfaz o movimento
  board.position(game.fen()); // atualiza o tabuleiro com o novo FEN
  setTimeout(()=>{
    
    game.move(`${posicoes[3].resposta}`)
    // game.move(`Qb6`)
    board.position(game.fen());
    updateStatus()       
    
    vez.style.color='black';
    vez.style.backgroundColor='rgb(96, 255, 117)';
        descricao.innerHTML=`<h1>Muito bem! Continue assim</h1>`
    vez.innerHTML='<h1>Você acertou</h1>' 
    variantes.innerHTML=``
    setTimeout(()=>{window.location.reload()},2000) 
  },1000)


} 
board = Chessboard('myBoard', config)

updateStatus()        

