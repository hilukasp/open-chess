var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  
  if (game.game_over()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

$('#move1Btn').on('click', function () {
  
  board.move('e2-e4')
  var move = game.move({
    
    //quando captura uma peça
    // captured: "p",

    //cor da peça
    color:"w",

    //n = movimento normal, b = peão avançado, c = captura de uma peça, k = rock pequeno, q= rock grande
    flags:"b",

    //posição inicial
    from:"e2",

    //nome da peça
    piece:"p",

    //notação pgn
    san:"e4",

    //posição final
    to: "e4"
  })
  console.log(move)
  updateStatus()
})

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
  
  updateStatus()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  
  board.position(game.fen())
}

function updateStatus() {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
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
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
  
}

function refazer() {
  game.undo(); // desfaz o movimento
  board.position(game.fen()); // atualiza o tabuleiro com o novo FEN
  updateStatus()        
}
board = Chessboard('myBoard', config)

updateStatus()        