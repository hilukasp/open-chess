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
 
INSERT INTO user (username, email, senha) VALUES
('mateus', 'a@', 'a'),
('ana', 'b@', 'a');
 
INSERT INTO posicao_flashcard (correto, id_user, id_posicao) VALUES
(false, 1,1),   
(true, 1,2),    
(false, 2,3),   
(true, 2,4);    
 
INSERT INTO posicao_chess (posicao, nome_categoria, resposta, orientacao) VALUES
('r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5', 'Italiana', 'Qb3', 'White'),
('r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', 'Ruy Lopez', 'O-O', 'White'),
('r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6', 'Francesa', 'Bd7', 'Black'),
('r1bqkbnr/pp3ppp/2n1p3/1BppP3/3P4/5N2/PPP2PPP/RNBQK2R b KQkq - 3 5', 'Francesa', 'Qb6', 'Black'),
('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', 'Italiana', 'd3', 'White');
