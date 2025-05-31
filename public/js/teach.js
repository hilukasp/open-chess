
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

        //cor da peça
        color: "w",

        //sempre b
        flags: "b",

        //posição inicial
        from: "e2",

        //nome da peça
        piece: "p",

        //notação pgn
        san: "e4",

        //posição final
        to: "e4"
    })
    console.log(move)
    updateStatus()
})

function onDrop(source, target) {

    //o código verifica se a peça está sendo dropada na sombra
    if (target != vetorShadow[shadowIndex - 1].to || source != vetorShadow[shadowIndex - 1].from) {
        // console.log(target, vetorShadow[shadowIndex-1].to)
        return 'snapback'
    } else {
        removeGreySquares()

    }

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
    console.log(move)



    // illegal move
    if (move === null) return 'snapback'
    validate(enemyMoveIndex)

    updateStatus()
    window.setTimeout(makeEnemyMove, 250)

}


var enemyMoveIndex = 0;
vetorEnemy = [{
    color: "b",
    flags: "b",
    from: "e7",
    piece: "p",
    san: "e5",
    to: "e5"
},
{
    "color": "b",
    "from": "b8",
    "to": "c6",
    "flags": "n",
    "piece": "n",
    "san": "Nc6",
    "mensagem": "Essa é a abertura Italiana."
}
]

var shadowIndex = 0
var vetorShadow = [{
    from: 'e2', to: 'e4'
},
{
    from: 'g1', to: 'f3'
},
{
    from: 'f1', to: 'c4'
}
];

function makeEnemyMove() {



    if (enemyMoveIndex >= vetorEnemy.length) {
        return
    };

    var move = game.move(vetorEnemy[enemyMoveIndex]);
    if (move) {
        board.position(game.fen());
        if (vetorEnemy[enemyMoveIndex].mensagem!=undefined) {
            descricao.innerHTML=`${vetorEnemy[enemyMoveIndex].mensagem}`
        }
        enemyMoveIndex++;
        updateStatus();
        greySquare()
        
    }
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {

    board.position(game.fen())
}

function updateStatus() {
    var status = ''

    var moveColor = 'White'
    vez.style.color = 'black';
    vez.style.backgroundColor = 'white';
    vez.innerHTML = '<h1>Vez das brancas</h1>'

    if (game.turn() === 'b') {
        vez.style.color = 'white';
        vez.style.backgroundColor = 'black';
        vez.innerHTML = '<h1>Vez das pretas</h1>'
        moveColor = 'Black'
    }

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
    position: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/2PP1NNP/PP3PP1/R1BQR1K1',

}
function clicar() {
    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd

    }

    board = Chessboard('myBoard', config)
    greySquare()
    opcoes.innerHTML = `<button onclick="resetar()">Recomeçar</button>`
    variantes.innerHTML = ``
}

board = Chessboard('myBoard', config)
updateStatus()

// 

var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

function removeGreySquares() {
    $('#myBoard .square-55d63').css('background', '')
}

function greySquare() {
    if (shadowIndex >= vetorShadow.length) {
        return
    };

    var $square = $('#myBoard .square-' + vetorShadow[shadowIndex].from)
    var $square2 = $('#myBoard .square-' + vetorShadow[shadowIndex].to)
    shadowIndex++
    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
    }
    var background2 = whiteSquareGrey
    if ($square2.hasClass('black-3c85d')) {
        background2 = blackSquareGrey
    }

    $square.css('background', background)
    $square2.css('background', background2)
}





//função responsável por ramificar as variantes
function validate(enemyMoveIndex) {
    variantes.innerHTML = ``
    var vetortemporario = []

    console.log('movimento do inimigo: ' + enemyMoveIndex)
    if (enemyMoveIndex === 2) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
        <button onclick="varianteEnemy(chessmove=1)">Bc5</button>
        <button onclick="varianteEnemy(chessmove=2)">d6</button>
        <button onclick="varianteEnemy(chessmove=3)">Cf6</button>
        `
    }

    if (enemyMoveIndex === 4 && variante == 1) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=6)">Bb6</button>
          <button onclick="varianteEnemy(chessmove=7)">exd4</button> 
          `
    }
    if (enemyMoveIndex === 3 && variante == 1) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=4)">d6</button>
          <button onclick="varianteEnemy(chessmove=5)">Cf6</button> 
          `
    }
    if (enemyMoveIndex === 3 && variante == 2) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=8)">Bg4</button>
          <button onclick="varianteEnemy(chessmove=9)">Cf6</button> 
          `
    }
    if (enemyMoveIndex === 4 && variante == 3) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=10)">Bxf3</button>
          <button onclick="varianteEnemy(chessmove=11)">Qd7</button> 
          `
    }
    if (enemyMoveIndex === 4 && variante == 5) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=16)">Be5</button>
          <button onclick="varianteEnemy(chessmove=17)">Qualquer outro movimento</button> 
          `
    }
    if (enemyMoveIndex === 8 &&  variante == 6) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=12)">Bxf3</button>
          <button onclick="varianteEnemy(chessmove=13)">Bh5</button> 
          `
    }
    if (enemyMoveIndex === 8 && variante == 2 ) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=12)">Bxf3</button>
          <button onclick="varianteEnemy(chessmove=18)">Bh5</button> 
          `
    }
    if (enemyMoveIndex === 8 && variante == 4) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=12)">Bxf3</button>
          <button onclick="varianteEnemy(chessmove=13)">Bh5</button> 
          `
    }
    if (enemyMoveIndex === 3 && variante == 4) {
        variantes.innerHTML = `<h2> Lances do inimigo: </h2>
          <button onclick="varianteEnemy(chessmove=15)">d6</button>
          <button onclick="varianteEnemy(chessmove=14)">Bc5</button> 
          `
    }
    // if (enemyMoveIndex===6 && variante==1||enemyMoveIndex===6 && variante==1){
    //     variantes.innerHTML = `<button onclick="clicar()">Começar</button>`
    // }

}

var variante = 0
function varianteEnemy(chessMove) {
    console.log('chessmove'+chessmove)
    console.log('variante'+variante)


    if (chessMove == 1) {
        variantes.innerHTML = ``
        vetortemporario =
        {
            color: "b",
            flags: "n",
            from: "f8",
            piece: "b",
            san: "c5",
            to: "c5",
            "mensagem": "O oponente desenvolve o bispo possivelmente preparando para um futuro roque<br><br>Jogue c3 para preparar o avanço do d4 em algum momento"
        }

        vetorEnemy.push(vetortemporario)
        makeEnemyMove()
        variante = 1
        vetortemporario =
        {
            from: "c2", to: "c3"
        }
        vetorShadow.push(vetortemporario)
        greySquare()
    }
    if (chessMove == 2) {
        variantes.innerHTML = ``
        vetortemporario = {
            "color": "b",
            "from": "d7",
            "to": "d6",
            "flags": "n",
            "piece": "p",
            "san": "d6",
            "mensagem":"O oponente não fez nenhuma ameaça contra você ainda<br><br> Continue com o plano principal da italiana preparando o ataque no centro"
        }

        vetorEnemy.push(vetortemporario)
        makeEnemyMove()
        vetortemporario =
        {
            from: "c2", to: "c3"
        }
        vetorShadow.push(vetortemporario)
        greySquare()
        variante = 2
    }
    if (chessMove == 3) {
        variantes.innerHTML = ``
        variante = 4
        vetortemporario = {
            "color": "b",
            "from": "g8",
            "to": "f6",
            "flags": "n",
            "piece": "n",
            "san": "Nf6",
            "mensagem":"O oponente ameaçou e4<br><br>Defenda seu peão"
        }

        vetorEnemy.push(vetortemporario)
        makeEnemyMove()

        vetortemporario = [
            {
                from: "d2", to: "d3"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }

    if (chessMove == 4) {
        variantes.innerHTML = ``
        vetortemporario = {
            "color": "b",
            "from": "d7",
            "to": "d6",
            "flags": "n",
            "piece": "p",
            "san": "d6",
    "mensagem": "d6 impede que o oponente consiga voltar com o bispo para um lugar mais seguro<br><br> não deixe a oportunidade passar e ataque o bispo para manter a pressão"
        }
        vetorEnemy.push(vetortemporario)
        makeEnemyMove()
        vetortemporario =
        {
            from: "d2", to: "d4"
        }
        vetorShadow.push(vetortemporario)
        greySquare()

    }

    if (chessMove == 5) {

        variante = 6
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "g8",
                "to": "f6",
                "flags": "n",
                "piece": "n",
                "san": "Nf6",
                "mensagem":"O oponente pretende tomar seu peão em e4<br><br> Jogue d3 para proteger o seu peão" //continuar
            },
            {
                "color": "b",
                "from": "e8",
                "to": "g8",
                "flags": "k",
                "piece": "k",
                "san": "O-O",
                "mensagem":"Ele fez o roque para se proteger<br><br>Aproveite o momento e coloque o seu rei em defesa também"
            },
            {
                "color": "b",
                "from": "d7",
                "to": "d6",
                "flags": "n",
                "piece": "p",
                "san": "d6",
                "mensagem":"O peão movimentado impede que o bispo do oponente volte a uma casa segura<br><br>Coloque a torre para defender a casa de e4, para que você possa preparar d4 em seguida"
            },
            {
                "color": "b",
                "from": "c8",
                "to": "g4",
                "flags": "n",
                "piece": "b",
                "san": "Bg4",
                "mensagem":"O bispo cravou o seu cavalo, ou seja, você não pode movimentar ele se não perde a dama<br><br>Nesse momento é necessário tirar esse bispo dessa casa ameaçadora para evitar ataques mais fortes"
            },
            {
                "color": "b",
                "from": "h7",
                "to": "h6",
                "flags": "n",
                "piece": "p",
                "san": "h6",
                "mensagem":"Ele fez um lance passivo<br><br>É hora de tirar esse bispo dessa casa"
            },

        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "d2", to: "d3"
            },
            {
                from: "e1", to: "g1"
            },
            {
                from: "f1", to: "e1"
            },
            {
                from: "b1", to: "d2"
            },
            {
                from: "h2", to: "h3"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 6) {
        variantes.innerHTML = ``
        vetortemporario = [{
            "color": "b",
            "from": "c5",
            "to": "b6",
            "flags": "n",
            "piece": "b",
            "san": "Bb6",
            "mensagem":"o bispo se afastou<br><br>tome o peão central"
        },
        {
            "color": "b",
            "from": "d6",
            "to": "e5",
            "flags": "c",
            "piece": "p",
            "captured": "p",
            "san": "dxe5",
            "mensagem":"o peão do oponente capturou seu peão de volta para não perder material, mas liberou caminho para a dama ser atacada<br><br>capture a dama"
        },
        {
            "color": "b",
            "from": "e8",
            "to": "d8",
            "flags": "c",
            "piece": "k",
            "captured": "q",
            "san": "Kxd8",
            "mensagem":"O rei precisou tomar forçadamente<br><br>Nesse momento você tirou o roque das pretas, ou seja, o rei inimigo está muito vulnerável em comparação a você que tem roque no próximo turno "
            
        }]

        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario =
            [{
                from: "d4", to: "e5"
            },
            {
                from: "d1", to: "d8"
            }]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()

    }
    if (chessMove == 7) {
        variantes.innerHTML = ``
        vetortemporario = [{
            "color": "b",
            "from": "e5",
            "to": "d4",
            "flags": "c",
            "piece": "p",
            "captured": "p",
            "san": "exd4",
            "mensagem":"Capture o peão de volta<br><br>"
        },
        {
            "color": "b",
            "from": "c5",
            "to": "b4",
            "flags": "n",
            "piece": "b",
            "san": "Bb4+",
            "mensagem":"Bispo deu check no seu rei<br><br>Coloque o cavalo na frente como proteção"
        },
        {
            "color": "b",
            "from": "b4",
            "to": "c3",
            "flags": "c",
            "piece": "b",
            "captured": "n",
            "san": "Bxc3+",
            "mensagem":"Recupere o material tomando o bispo de volta<br><br>"
        },
        {
            "color": "b",
            "from": "g8",
            "to": "f6",
            "flags": "n",
            "piece": "n",
            "san": "Nf6",
            "mensagem":"O cavalo ameaça o peão desprotegido de e4<br><br>Não tem necessidade de proteger, utilize o peão como isca <br><br>Faça o roque para colocar o seu rei em um lugar seguro"
        },
        {
            "color": "b",
            "from": "f6",
            "to": "e4",
            "flags": "c",
            "piece": "n",
            "captured": "p",
            "san": "Nxe4",
            "mensagem":"O oponente tomou seu peão desprotegido<br><br>Jogue torre e1 para cravar o cavalo do oponente<br><br>O cavalo não consegue se mover porque o rei ficará em perigo"
        },
        {
            "color": "b",
            "from": "d6",
            "to": "d5",
            "flags": "n",
            "piece": "p",
            "san": "d5",
            "mensagem":"Ele decidiu defender o cavalo<br><br>Jogue bispo a3 para evitar que o oponente faça o roque pequeno"
        },
        {
            "color": "b",
            "from": "d5",
            "to": "c4",
            "flags": "c",
            "piece": "p",
            "captured": "b",
            "san": "dxc4",
            "mensagem":"O peão tomou seu bispo<br><br>Você consegue tomar o cavalo dele e ainda ameaçar o check"
        },
        {
            "color": "b",
            "from": "c8",
            "to": "e6",
            "flags": "n",
            "piece": "b",
            "san": "Be6",
            "mensagem":"Único lance forçado que ele pode fazer é colocando o bispo para defender o rei<br><br>d5 faz com que você consiga ameaçar 2 peças do oponente ao mesmo tempo<br><br> Independetemente do lance que ele fará, você tem vantagem material e pode escolher tomar o bispo ou o cavalo dependendo do que o oponente jogar"
        }
        ]

        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "c3", to: "d4"
            },
            {
                from: "b1", to: "c3"
            },
            {
                from: "b2", to: "c3"
            },
            {
                from: "e1", to: "g1"
            },
            {
                from: "f1", to: "e1"
            },
            {
                from: "c1", to: "a3"
            },
            {
                from: "e1", to: "e4"
            },
            {
                from: "d4", to: "d5"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 8) {
        variantes.innerHTML = ``
        vetortemporario = {
            "color": "b",
            "from": "c8",
            "to": "g4",
            "flags": "n",
            "piece": "b",
            "san": "Bg4",
            "mensagem":"O bispo removido enfraquece a casa de b7<br><br>Jogue a dama para ameaçar as duas casas simultaneamente, tanto a de f7 e b7"
        }

        vetorEnemy.push(vetortemporario)
        makeEnemyMove()
        vetortemporario =
        {
            from: "d1", to: "b3"
        }
        vetorShadow.push(vetortemporario)
        greySquare()
        variante = 3
    }
    if (chessMove == 10) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "g4",
                "to": "f3",
                "flags": "c",
                "piece": "b",
                "captured": "n",
                "san": "Bxf3",
            "mensagem":"Ele tomou o seu cavalo, mas deixou uma casa vulnerável<br><br>Mate em 2"
            },
            {
                "color": "b",
                "from": "e8",
                "to": "e7",
                "flags": "n",
                "piece": "k",
                "san": "Ke7",
            "mensagem":"Mate em 1<br><br>"
            }
        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "c4", to: "f7"
            },
            {
                from: "b3", to: "e6"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }

    if (chessMove == 11) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "d8",
                "to": "d7",
                "flags": "n",
                "piece": "q",
                "san": "Qd7",
            "mensagem":"Oponente defendeu a casa de f7 com a dama, porém deixou b7 enfraquecido<br><br>Tome a casa de b7"
            },
            {
                "color": "b",
                "from": "a8",
                "to": "b8",
                "flags": "n",
                "piece": "r",
                "san": "Rb8",
            "mensagem":"A torre ameaça a sua dama<br><br>Coloque ela em um lugar seguro"
            },
            {
                "color": "b",
                "from": "g4",
                "to": "f3",
                "flags": "c",
                "piece": "b",
                "captured": "n",
                "san": "Bxf3",
            "mensagem":"O bispo capturou seu cavalo<br><br>recapture de peão<br><br>Nessa posição, você tem uma considerável vantagem. Seu oponente perdeu um peão, e sua estrutura de peões está melhor do que a dele"
            }
        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "b3", to: "b7"
            },
            {
                from: "b7", to: "a6"
            },
            {
                from: "g2", to: "f3"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 9) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "g8",
                "to": "f6",
                "flags": "n",
                "piece": "n",
                "san": "Nf6",
            "mensagem":"O oponente ameaça tomar e4<br><br>Defenda o seu peão"
            }, {
                "color": "b",
                "from": "c8",
                "to": "g4",
                "flags": "n",
                "piece": "b",
                "san": "Bg4",  
                "mensagem":"O bispo cravou o seu cavalo, ou seja, você não pode movimentar ele se não perde a dama<br><br>Nesse momento é necessário tirar esse bispo dessa casa ameaçadora para evitar ataques mais fortes"
            
            },
            {
                "color": "b",
                "from": "f8",
                "to": "e7",
                "flags": "n",
                "piece": "b",
                "san": "Be7",
            "mensagem":"Faça o roque para defender melhor o seu rei<br><br>"
            },
            {
                "color": "b",
                "from": "e8",
                "to": "g8",
                "flags": "k",
                "piece": "k",
                "san": "O-O",
            "mensagem":"Ative a sua torre colocando ela no meio"
            },
            {
                "color": "b",
                "from": "h7",
                "to": "h6",
                "flags": "n",
                "piece": "p",
                "san": "h6",
                "mensagem":"Ele fez um lance passivo<br><br>É hora de tirar esse bispo dessa casa"
            
            }

        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "d2", to: "d3"
            },
            {
                from: "b1", to: "d2"
            },
            {
                from: "e1", to: "g1"
            },
            {
                from: "f1", to: "e1"
            },
            {
                from: "h2", to: "h3"
            }

        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 12) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "g4",
                "to": "f3",
                "flags": "c",
                "piece": "b",
                "captured": "n",
                "san": "Bxf3",
                "mensagem":"O bispo tomou o seu cavalo<br><br>Retome a peça utilizando o cavalo"

            },
            {
                "color": "b",
                "from": "d8",
                "to": "d7",
                "flags": "n",
                "piece": "q",
                "san": "Qd7",
                "mensagem":"Está na hora de abrir o centro visto que todas as peças estão protegidas<br><br>"
            },
            {
                "color": "b",
                "from": "e5",
                "to": "d4",
                "flags": "c",
                "piece": "p",
                "captured": "p",
                "san": "exd4",
                "mensagem":"Retome o peão<br><br>Nessa posição você já consegue ter a autonomia de realizar lances mais agressivos, visto que o centro está aberto, peças desenvolvidas e rei protegido"
            },

        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "d2", to: "f3"
            },
            {
                from: "d3", to: "d4"
            },
            {
                from: "c3", to: "d4"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 13) {
        variantes.innerHTML = ``
        variante = 0
        vetortemporario = [
            {
                "color": "b",
                "from": "g4",
                "to": "h5",
                "flags": "c",
                "piece": "b",
                "captured": "n",
                "san": "Bh5",
                "mensagem":"Ele recuou com o bispo, mas ainda sim ele está cravando o cavalo. Precisamos atacar a casa de h5<br><br>Vamos manobrar o cavalo para que ele alcance a casa de g3 e assim expulsar o bispo da cravada"
            },
            {
                "color": "b",
                "from": "d8",
                "to": "d7",
                "flags": "n",
                "piece": "q",
                "san": "Qd7",
                "mensagem":"Coloque o cavalo para ameaçar o bispo do oponente<br><br>"
            },
            {
                "color": "b",
                "from": "h5",
                "to": "g6",
                "flags": "n",
                "piece": "b",
                "san": "Bg6",
                "mensagem":"Ainda não podemos avançar com d4 ainda<br><br>b4 lhe dará mais vantagem pois você coloca pressão no bispo que está preso na ala da dama"
            }, 
            {
                "color": "b",
                "from": "c5",
                "to": "b6",
                "flags": "n",
                "piece": "b",
                "san": "Bb6",
                "mensagem":"Lance forçado, recuou o bispo por falta de opção do que fazer"
           // "mensagem":"<br><br>"
            },
            {
                "color": "b",
                "from": "a7",
                "to": "a5",
                "flags": "n",
                "piece": "p",
                "san": "a5",
                "mensagem":"Ele avançou o peão para impedirmos de avançar no bispo<br><br>Portanto ataque o cavalo para deixar as peças dele presa"

            },
            {
                "color": "b",
                "from": "c6",
                "to": "d8",
                "flags": "n",
                "piece": "n",
                "san": "Nd8",
                "mensagem":"Nesse momento podemos jogar d4 e ganhar o centro  <br><br>"
            },
            {
                "color": "b",
                "from": "e5",
                "to": "d4",
                "flags": "c",
                "piece": "p",
                "captured": "p",
                "san": "exd4",
                "mensagem":"Retome de peão<br><br>Você tem uma posição muito confortável agora<br><br>As peças do seu oponente estão presas e recuadas, isso lhe dá a chance do mesmo não conseguir atacar e você consegue explorar invulnerabilidades em cima disso"
            }
        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "d2", to: "f1"
            },
            {
                from: "f1", to: "g3"
            },
            {
                from: "b2", to: "b4"
            },
            {
                from: "a2", to: "a4"
            },
            {
                from: "b4", to: "b5"
            },
            {
                from: "d3", to: "d4"
            },
            {
                from: "c3", to: "d4"
            },
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 14) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "f8",
                "to": "c5",
                "flags": "n",
                "piece": "b",
                "san": "Bc5",
                "mensage":"Desenvolveu o bispo e abriu a ala para que o rei consiga fazer roque<br><br>Joque c3 para desenvolver o plano da italiana"
            },
            {
                "color": "b",
                "from": "e8",
                "to": "g8",
                "flags": "k",
                "piece": "k",
                "san": "O-O",
                "mensage":"O oponente colocou o rei dele em proteção<br><br>Proteja o seu rei também"
            },
            {
                "color": "b",
                "from": "d7",
                "to": "d6",
                "flags": "n",
                "piece": "p",
                "san": "d6",
            "mensagem":"Ative a sua torre colocando ela no meio"
            },
            {
                "color": "b",
                "from": "c8",
                "to": "g4",
                "flags": "n",
                "piece": "b",
                "san": "Bg4",
                "mensagem":"O bispo cravou o seu cavalo, ou seja, você não pode movimentar ele se não perde a dama<br><br>Nesse momento é necessário tirar esse bispo dessa casa ameaçadora para evitar ataques mais fortes"
            },
            {
                "color": "b",
                "from": "h7",
                "to": "h6",
                "flags": "n",
                "piece": "p",
                "san": "h6",
                "mensagem":"Ele fez um lance passivo<br><br>É hora de tirar esse bispo dessa casa"
            },
        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "c2", to: "c3"
            },
            {
                from: "e1", to: "g1"
            },
            {
                from: "f1", to: "e1"
            },
            {
                from: "b1", to: "d2"
            },
            {
                from: "h2", to: "h3"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 15) {
        variantes.innerHTML = ``
        variante = 5
        vetortemporario = [
            {
                "color": "b",
                "from": "d7",
                "to": "d6",
                "flags": "n",
                "piece": "p",
                "san": "d6",
            "mensagem":"A casa de f7 está vulnerável<br><br>Único lance que ele pode fazer para defender a casa de f7 é utilizando o bispo"
            },

        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "f3", to: "g5"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 16) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "c8",
                "to": "e6",
                "flags": "n",
                "piece": "b",
                "san": "Be6",
                "mensagem":"o bispo bloqueou a casa de f7<br><br>tome o bispo dele com o cavalo"
            },
            {
                "color": "b",
                "from": "f7",
                "to": "e6",
                "flags": "c",
                "piece": "p",
                "captured": "n",
                "san": "fxe6",
            "mensagem":"tome o peão do centro<br><br>você adquiriu vantagem material"
            }

        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "g5", to: "e6"
            },
            {
                from: "c4", to: "e6"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 17) {
        variantes.innerHTML = ``
        vetortemporario = [
            {
                "color": "b",
                "from": "a7",
                "to": "a6",
                "flags": "n",
                "piece": "p",
                "san": "a6",
                "mensage":"O lance abriu margem para que o peão de f7 fique sem proteção nenhuma<br><br>Tome de cavalo e assim ameaçará tanto a dama quanto a torre"
            },
            {
                "color": "b",
                "from": "d8",
                "to": "d7",
                "flags": "n",
                "piece": "q",
                "san": "Qd7",
                "mensage":"Ele decidiu fugir com a rainha<br><br>Tome a torre garantindo uma grande vantagem material"
            }

        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
            {
                from: "g5", to: "f7"
            },
            {
                from: "f7", to: "h8"
            }
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
    }
    if (chessMove == 18) {
        variantes.innerHTML = ``
        variante = 0
        vetortemporario = [
          {
                "color": "b",
                "from": "g4",
                "to": "h5",
                "flags": "c",
                "piece": "b",
                "captured": "n",
                "san": "Bh5",
                "mensagem":"Ele recuou com o bispo, mas ainda sim ele está cravando o cavalo. Precisamos atacar a casa de h5<br><br>Vamos manobrar o cavalo para que ele alcance a casa de g3 e assim expulsar o bispo da cravada"
            },
            {
                "color": "b",
                "from": "d8",
                "to": "d7",
                "flags": "n",
                "piece": "q",
                "san": "Qd7",
                "mensagem":"Coloque o cavalo para ameaçar o bispo do oponente<br><br>"
            },
          {
            "color": "b",
            "from": "h5",
            "to": "g6",
            "flags": "n",
            "piece": "b",
            "san": "Bg6",
            "mensagem":"O bispo recuou<br><br>Podemos seguir o plano da italiana de avançar o centro de peões"
          },
          {
            "color": "b",
            "from": "e5",
            "to": "d4",
            "flags": "c",
            "piece": "p",
            "captured": "p",
            "san": "exd4",
            "mensagem":"Tome o peão capturado<br><br>Nessa posição você já consegue ter a autonomia de realizar lances mais agressivos, visto que o centro está aberto, peças desenvolvidas e rei protegido"
          }
        ]
        vetortemporario.forEach(mov => vetorEnemy.push(mov))
        makeEnemyMove()

        vetortemporario = [
          {
            from: "d2", to: "f1"
          },
          {
            from: "f1", to: "g3"
          },
          {
            from: "d3", to: "d4"
          },
          {
            from: "c3", to: "d4"
          },
        ]
        vetortemporario.forEach(shadow => vetorShadow.push(shadow))
        greySquare()
      }
}

// function refazer() {
//   enemyMoveIndex--
//   shadowIndex--
//   shadowIndex--
//   removeGreySquares()

//   game.undo(); // desfaz o movimento
//   game.undo(); // desfaz o movimento

//   greySquare()
//   board.position(game.fen()); // atualiza o tabuleiro com o novo FEN
//   updateStatus()
// }

function resetar() {
    game.reset()
    board.position('start');
    removeGreySquares();
    enemyMoveIndex = 0;
    variantes.innerHTML = ``
    descricao.innerHTML=`
    <p>A Italiana é uma das aberturas mais clássicas e agressiva do xadrez, ela tem o principal objetivo de abrir o centro e proteger o rei com o roque pequeno. </p>
                        <br>
                        <p>Formidável para pessoas que gostam de uma posições mais abertas e com várias táticas</p><br>
                        <p>A abertura do centro só acontece quando o peão estiver em c3 e depois o peão do meio avança para d4</p><br>
                        <p>No avanço é importante que todas as peças estejam protegidas para não haver perda de material</p><br>
                        <p>Na maioria das vezes a posição das brancas ficarão assim, com o cavalo de g3 e a torre defendendo e4</p><br>
                        <p>Toque na peça cinza e mova para o quadrado cinza onde indica os melhores movimentos da variante</p>
    `
    vetorEnemy = [{
        color: "b",
        flags: "b",
        from: "e7",
        piece: "p",
        san: "e5",
        to: "e5"
    },
    {
        "color": "b",
        "from": "b8",
        "to": "c6",
        "flags": "n",
        "piece": "n",
        "san": "Nc6",
    "mensagem": "Essa é a abertura Italiana."
    }
    ]

    shadowIndex = 0
    vetorShadow = [{
        from: 'e2', to: 'e4'
    },
    {
        from: 'g1', to: 'f3'
    },
    {
        from: 'f1', to: 'c4'
    }
    ];
    greySquare()
    updateStatus()

}