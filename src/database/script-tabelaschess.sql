create database openchess;
use openchess;

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
foreign key (id_user) references  user(id)
);

create table posicao_chess(
id int primary key auto_increment,
posicao varchar(100),
nome_categoria varchar(50),														
resposta varchar(50),
id_posicao int,
foreign key (id_posicao) references posicao_flashcard(id)
);
-- selecionar estastisticas de quando o player errar a posicao
 
INSERT INTO user (username, email, senha) VALUES
('mateus', 'a@', 'a'),
('ana', 'b@', 'a');
 
INSERT INTO posicao_flashcard (correto, id_user) VALUES
(false, 1),   
(true, 1),    
(false, 2),   
(true, 2);    
 
INSERT INTO posicao_chess (posicao, nome_categoria, resposta, id_posicao) VALUES
('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'Abertura', 'e4', 1),  
('r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R', 'Defesa', 'Nf3', 2),  
('rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R', 'Tática', 'Nc3', 3), 
('r1bqk1nr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R', 'Final', 'O-O', 4);  	
