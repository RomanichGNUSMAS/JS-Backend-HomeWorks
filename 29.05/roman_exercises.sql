-- Task 1.1
CREATE DATABASE bookstore;

-- Task 1.2
\l

-- Task 1.3
\c bookstore

-- Task 1.4
\conninfo

-- Task 2.1
CREATE USER librarian WITH PASSWORD 'lib123';

-- Task 2.2
CREATE USER visitor WITH PASSWORD 'vis123';

-- Task 2.3
\du

-- Task 2.4
CREATE ROLE readers;
-- տարբերությունը այն է, որ CREATE ROLE-ի դեպքում պարամետրեր մենք manual պետք է փոխանցենք իսկ CREATE USER-ի դեպքում պարամետրեր փոխանցվում է որից մեկը WITH LOGIN

-- Task 2.5
GRANT CONNECT ON DATABASE bookstore TO visitor;

-- Task 2.6
ALTER USER librarian WITH PASSWORD 'newpass456';

-- Task 2.7
ALTER USER visitor WITH NOLOGIN;

ALTER USER visitor WITH LOGIN;


-- task 5.5
--վտանգավոր է, որովհետեվ կարող է նաև փոփոխման անհրաժեշտություն չունեցող տվյալները կորցենք կամ փոխենք 

-- task 6.1
ALTER TABLE books ADD COLUMN pages INTEGER;

-- task 6.2
ALTER TABLE books ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

-- task 6.3
ALTER TABLE customers RENAME COLUMN full_name TO name;
ALTER TABLE books
ADD COLUMN name TEXT NOT NULL;

-- task 6.4
ALTER TABLE books
ALTER COLUMN price TYPE smallint;

-- Task 6.5
ALTER TABLE books ADD CONSTRAINT pages CHECK (pages >= 0);


-- Task 6.6
ALTER TABLE authors DROP COLUMN country;
ALTER TABLE authors ADD COLUMN country TEXT DEFAULT 'Armenia';


-- task 7.1
GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE books TO librarian;

-- taask 7.2
GRANT SELECT ON TABLE books TO visitor;

-- Task 7.3
-- ОШИБКА:  нет доступа к таблице books

-- Task 7.4
-- այն աշխատեց քանզի ես տվել եի GRANT SELECT visitor-ին

-- Task 7.5
GRANT readers TO visitor;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readers;

-- Task 7.6
REVOKE INSERT ON books FROM librarian;

-- Task 8.1
SELECT books.title,authors.name
FROM books
INNER JOIN authors ON authors.id = book.author_id;

-- Task 8.2
SELECT * FROM books
INNER JOIN authors ON books.author_id = authors.id
 WHERE authors.birth_year > 1900;

-- Task 8.3
SELECT authors.name, COUNT(books.id)
FROM books
INNER JOIN authors ON authors.id = books.author_id
GROUP BY authors.id;

-- Task 8.4
SELECT authors.name, COUNT(books.id)
FROM books
INNER JOIN authors ON authors.id = books.author_id
GROUP BY authors.id
HAVING COUNT(books.id) > 1;

-- Task 9.1
\du

-- Task 9.2
