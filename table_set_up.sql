DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Annotation;
DROP TABLE IF EXISTS Symbol;

CREATE TABLE Book (id INT AUTO_INCREMENT PRIMARY KEY, bookName VARCHAR(60) NOT NULL, annoName VARCHAR(60));
CREATE TABLE Annotation (id INT AUTO_INCREMENT PRIMARY KEY, bookId INT NOT NULL, pagenum INT NOT NULL, symbolID INT NOT NULL);
CREATE TABLE Symbol (id INT AUTO_INCREMENT PRIMARY KEY, url VARCHAR(255) NOT NULL, wordstosay VARCHAR(60) NOT NULL);

INSERT INTO  Book VALUES (0, 'snail-features', 'Ao1');
INSERT INTO  Book VALUES (0, 'snail-features', 'Ao2');

INSERT INTO  Annotation VALUES (0, 1, 1, 1);
INSERT INTO  Annotation VALUES (0, 1, 1, 1);
INSERT INTO  Annotation VALUES (0, 1, 1, 1);
INSERT INTO  Annotation VALUES (0, 1, 1, 1);

INSERT INTO  Annotation VALUES (0, 1, 2, 1);
INSERT INTO  Annotation VALUES (0, 1, 2, 1);
INSERT INTO  Annotation VALUES (0, 1, 2, 1);
INSERT INTO  Annotation VALUES (0, 1, 2, 1);

INSERT INTO  Annotation VALUES (0, 2, 1, 2);
INSERT INTO  Annotation VALUES (0, 2, 1, 2);
INSERT INTO  Annotation VALUES (0, 2, 1, 2);
INSERT INTO  Annotation VALUES (0, 2, 1, 2);

INSERT INTO  Annotation VALUES (0, 2, 2, 2);
INSERT INTO  Annotation VALUES (0, 2, 2, 2);
INSERT INTO  Annotation VALUES (0, 2, 2, 2);
INSERT INTO  Annotation VALUES (0, 2, 2, 2);

INSERT INTO  Symbol VALUES (0, '/CHAIR/PCS/00105all.png', 'all');
INSERT INTO  Symbol VALUES (0, '/CHAIR/PCS/00135different.png', 'different');