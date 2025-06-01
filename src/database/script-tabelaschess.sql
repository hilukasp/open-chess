create database openchess;
use openchess;
-- drop database openchess;
create table user(
id int primary key auto_increment,
username varchar(50),
email varchar(50),
senha varchar(50)

);

create table posicao_flashcard(
id int primary key auto_increment,
correto boolean,
revisao datetime not null default current_timestamp,
id_user int,
id_posicao int,
foreign key (id_user) references  user(id),
foreign key (id_posicao) references posicao_flashcard(id)
);

create table posicao_chess(
id int primary key auto_increment,
posicao varchar(100),
nome_categoria varchar(50),														
resposta varchar(50),
orientacao varchar(50)
);
-- selecionar estastisticas de quando o player errar a posicao
 
insert into user (username, email, senha) values
('mateus', 'a@', 'a'),
('ana', 'b@', 'a'),
('user', 'user', 'user');
 
 select * from user;
insert into posicao_flashcard (correto, id_user, id_posicao) values
(false, 1,1),   
(true, 1,2),    
(false, 2,3),   
(true, 2,4);    
 
 select * from posicao_chess;
 select * from posicao_flashcard;
 
select jogador.* , historico.* from user jogador inner join posicao_flashcard historico on jogador.id=historico.id_user where jogador.id=3;
 select jogador.* , historico.* ,abertura.* from user jogador 
inner join posicao_flashcard historico 
on jogador.id=historico.id_user
inner join posicao_chess abertura 
on abertura.id=historico.id_posicao where jogador.id=3 order by revisao desc;

select 

  abertura.nome_categoria,
  sum(case when historico.correto = true then 1 else 0 end) as correto 
from posicao_flashcard historico inner join posicao_chess abertura 
on historico.id_posicao = abertura.id
where historico.id_user = 3
group by abertura.nome_categoria;
 

insert into posicao_chess (posicao, nome_categoria, resposta, orientacao) values
('r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5', 'Italiana', 'Qb3', 'white'),
('r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', 'Ruy Lopez', 'O-O', 'white'),
('r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6', 'Francesa', 'Bd7', 'black'),
('r1bqkbnr/pp3ppp/2n1p3/1BppP3/3P4/5N2/PPP2PPP/RNBQK2R b KQkq - 3 5', 'Francesa', 'Qb6', 'black'),
('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', 'Italiana', 'd3', 'white');

insert into posicao_flashcard (correto, id_user, id_posicao) values 
(1, 3, 2),
(1, 3, 4),
(1, 3, 5),
(1, 3, 1),
(0, 3, 2),
(1, 3, 2),
(0, 3, 3),
(0, 3, 2)	;
