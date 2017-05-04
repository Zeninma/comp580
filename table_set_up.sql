DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Annotation;
DROP TABLE IF EXISTS Symbol;

CREATE TABLE Book (id INT AUTO_INCREMENT PRIMARY KEY, bookName VARCHAR(60) NOT NULL, annoName VARCHAR(60));
CREATE TABLE Annotation (id INT AUTO_INCREMENT PRIMARY KEY, bookId INT NOT NULL, pagenum INT NOT NULL, symbolID INT NOT NULL);
CREATE TABLE Symbol (id INT AUTO_INCREMENT PRIMARY KEY, url VARCHAR(255) NOT NULL, wordstosay VARCHAR(60) NOT NULL);


INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00105all.png', 'all');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00135different.png', 'different');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00165good.png', 'good');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00203more.png', 'more');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00240same.png', 'same');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00253some.png', 'some');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00623in.png', 'in');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00632not.png', 'not');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00637on.png', 'on');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00648that.png', 'that');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00662up.png', 'up');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00670what.png', 'what');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00671when.png', 'when');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00672where.png', 'where');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00675who.png', 'who');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/00676why.png', 'why');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/01805here.png', 'here');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/02332it.png', 'it');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/02477he.png', 'he');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/02479I.png', 'I');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/02529she.png', 'she');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/02564you.png', 'you');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03077can.png', 'can');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03127do.png', 'do');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03168finish.png', 'finish');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03181get.png', 'get');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03190go.png', 'go');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03250like.png', 'like');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03255look.png', 'look');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03289open.png', 'open');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03331put.png', 'put');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03424stop.png', 'stop');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03456turn.png', 'turn');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03478want.png', 'want');
INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03603help.png', 'help');

INSERT INTO Symbol VALUES (0, '/CHAIR/PCS/03649make.png', 'make');