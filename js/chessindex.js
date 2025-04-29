var board = null
var game = new Chess()
var onnn=false

function ligar() {
    onnn =true
    console.log('a') 

}
function desligar( ) {
    onnn =false
}

function makeRandomMove () {
    if (onnn) { 
        var possibleMoves = game.moves()
        
        // exit if the game is over
        if (game.game_over()) return
        
        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIdx])
        board.position(game.fen())
         
    }
    window.setTimeout(makeRandomMove, 500);
} 

board = Chessboard('myBoard', 'start')

$('#myBoard').on('mouseenter', ligar); // jQuery
$('#myBoard').on('mouseleave', desligar);

makeRandomMove();

var board2 = null
var game2 = new Chess() 

var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R'
var board2   = Chessboard('myBoard2', ruyLopez)
