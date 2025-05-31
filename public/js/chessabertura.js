var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R'
var italiana=  'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R'
var francesa= 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR'
var carokann='rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR'
// var normal= 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
 
 

var aberturas = [
    { nome: 'Italiana', posicao: italiana,orientation:'white',link:'italiana.html' },
    { nome: 'Francesa', posicao: francesa,orientation:'black',link:'italiana.html' },
    { nome: 'Ruy Lopez', posicao: ruyLopez,orientation:'white',link:'italiana.html' },
    { nome: 'Caro-Kann', posicao: carokann,orientation:'black',link:'italiana.html' },
    // { nome: 'Normal', posicao: normal,orientation:'black'}
];
// var config = {
//     orientation: 'black',
//     position: 'start'
//   }

var board=[]
for(i=0;i<aberturas.length;i++){ 
    resultado.innerHTML+=`<div><a href="${aberturas[i].link}"><div id="myOpen${i}" ></div><p>${aberturas[i].nome}<p></a></div>`
}

for(i=0;i<aberturas.length;i++){
    board[i] = Chessboard('myOpen' + i, {
        position: aberturas[i].posicao,
        orientation: aberturas[i].orientation
    }); 
}

// var board2 = null
// var game2= new Chess() 

// var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R'
// var board2   = Chessboard('myBoard1', ruyLopez)