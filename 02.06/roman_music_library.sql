DROP TABLE IF EXISTS listening_history;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;


-- =========================================================
-- STAGE 1 - DESIGN THE SCHEMA
-- =========================================================

-- Task 1.1 - Identify your tables
-- To build this music streaming app, we need 5 core tables:
-- 1. artists - To store information about musicians and bands.
-- 2. albums - To store information about album releases.
-- 3. songs - To store individual track details.
-- 4. users - To manage listener account details.
-- 5. listening_history - To track which user listened to which song and when.

-- Task 1.2 - List the columns for each table
-- Here is the planned architecture and column structure for our database:
--
-- Table: artists
--   - id (SERIAL, Primary Key) -> Unique identifier for each artist
--   - name (TEXT, NOT NULL) -> Name of the artist or band
--   - country (TEXT) -> Country of origin
--
-- Table: albums
--   - id (SERIAL, Primary Key) -> Unique identifier for each album
--   - title (TEXT, NOT NULL) -> Title of the album
--   - release_year (INTEGER) -> Year the album was released
--   - artist_id (INTEGER, Foreign Key referencing artists.id) -> Connects album to its artist
--
-- Table: songs
--   - id (SERIAL, Primary Key) -> Unique identifier for each song
--   - title (TEXT, NOT NULL) -> Title of the song
--   - length_seconds (INTEGER, NOT NULL) -> Track duration in seconds (Must be greater than 0)
--   - genre (TEXT) -> Music genre (e.g., Rock, Hip-Hop, Pop)
--   - album_id (INTEGER, Foreign Key referencing albums.id) -> Connects song to its album
--
-- Table: users
--   - id (SERIAL, Primary Key) -> Unique identifier for each user
--   - name (TEXT, NOT NULL) -> User's display name
--   - email (TEXT, UNIQUE, NOT NULL) -> User's unique email address for registration
--   - signup_date (DATE, DEFAULT CURRENT_DATE) -> The date when the user created their account
--
-- Table: listening_history
--   - id (SERIAL, Primary Key) -> Unique identifier for each listening event
--   - user_id (INTEGER, Foreign Key referencing users.id) -> Connects the event to the user
--   - song_id (INTEGER, Foreign Key referencing songs.id) -> Connects the event to the song
--   - played_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP) -> Exact date and time when the song was played

-- Task 1.3 - Draw the relationships
-- The database schema uses the following relationships:
-- 1. artists to albums: One-to-Many (An artist can release multiple albums, but an album belongs to one artist).
-- 2. albums to songs: One-to-Many (An album contains multiple songs, but a song belongs to one specific album).
-- 3. users to songs (via listening_history): Many-to-Many (A user can listen to many songs, and a song can be listened to by many users. The listening_history table serves as the junction table).


-- Tas k2.1
CREATE DATABASE music_library;

-- Task 2.2
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT DEFAULT 'Armenia'   
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    release_year INTEGER,
    artist_id INTEGER NOT NULL REFERENCES artists(id)
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    length_seconds INTEGER NOT NULL CHECK (length_seconds > 0),
    genre TEXT,
    album_id INTEGER NOT NULL REFERENCES albums(id) 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    signup_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE listening_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    song_id INTEGER NOT NULL REFERENCES songs(id),
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task 2.3 - Verify your tables
-- (You can run '\dt' in psql terminal to see all created tables)
SELECT * FROM artists;
SELECT * FROM albums;
SELECT * FROM songs;
SELECT * FROM users;
SELECT * FROM listening_history;

-- Task 2.4
ALTER TABLE artists ADD COLUMN biography TEXT NOT NULL;
ALTER TABLE artists RENAME COLUMN biography TO bio;
ALTER TABLE artists DROP COLUMN bio;

-- Task 3.1
INSERT INTO artists (name, country) VALUES (
    'System of a Down',
    'USA'
),
(
    'Daft Punk',
    'France'
),
(
    'Adele',
    'UK'
),
(
    'Rammstein',
    'Germany'
),
(
    'Stromae',
    'Belgium'
);

-- Task 3.2
INSERT INTO albums (title, release_year, artist_id) VALUES 
-- System of a Down (ID: 1) - 3 альбома
('Toxicity', 2001, 1),
('Mezmerize', 2005, 1),
('Hypnotize', 2005, 1),

-- Daft Punk (ID: 2) - 3 альбома
('Discovery', 2001, 2),
('Human After All', 2005, 2),
('Random Access Memories', 2013, 2),

-- Adele (ID: 3) - 2 альбома
('21', 2011, 3),
('25', 2015, 3),

-- Rammstein (ID: 4) - ровно 1 альбом
('Mutter', 2001, 4);



-- Task 3.3
INSERT INTO songs (title, length_seconds, genre, album_id) VALUES 
-- Toxicity (ID: 1) - Rock / Metal
('Chop Suey!', 210, 'Alternative Metal', 1),
('Toxicity', 219, 'Alternative Metal', 1),
('Aerials', 235, 'Alternative Metal', 1),

-- Mezmerize (ID: 2) - Rock
('B.Y.O.B.', 255, 'Hard Rock', 2),
('Radio/Video', 249, 'Alternative Rock', 2),

-- Hypnotize (ID: 3) - Rock
('Hypnotize', 189, 'Hard Rock', 3),
('Lonely Day', 167, 'Alternative Rock', 3),

-- Discovery (ID: 4) - Electronic / Synthpop
('One More Time', 320, 'House', 4),
('Aerodynamic', 207, 'Electronic', 4),
('Harder, Better, Faster, Stronger', 224, 'Synthpop', 4),

-- Human After All (ID: 5) - Electronic / Rock
('Robot Rock', 287, 'Electro-Rock', 5),
('Technologic', 284, 'Electronic', 5),

-- Random Access Memories (ID: 6) - Electronic / Funk / Jazz
('Get Lucky', 369, 'Funk', 6),
('Lose Yourself to Dance', 353, 'Disco', 6),
('Giorgio by Moroder', 544, 'Jazz Fusion', 6),
('Instant Crush', 337, 'Indie Pop', 6),

-- 21 (ID: 7) - Pop / Soul / Blues
('Rolling in the Deep', 228, 'Soul', 7),
('Someone Like You', 285, 'Pop', 7),
('Rumour Has It', 223, 'Blues Rock', 7),

-- 25 (ID: 8) - Pop / Soul
('Hello', 295, 'Pop', 8),
('Send My Love (To Your New Lover)', 223, 'Acoustic Pop', 8),
('When We Were Young', 291, 'Soul', 8),

-- Mutter (ID: 9) - Industrial / Rock
('Sonne', 272, 'Industrial Metal', 9),
('Ich Will', 217, 'Industrial Metal', 9);

-- Task 3.4
INSERT INTO users (name, email, signup_date) VALUES 
('Alice Smith', 'alice.smith@example.com', '2025-11-15'),
('Bob Jones', 'bob.jones@example.com', '2026-01-10'),
('Charlie Brown', 'charlie.b@example.com', '2026-03-22'),
('Diana Prince', 'diana.p@example.com', '2026-05-01'),
('Evan Wright', 'evan.wright@example.com', DEFAULT);

-- Task 3.5
INSERT INTO listening_history (user_id, song_id, played_at) VALUES 
-- ПОЛЬЗОВАТЕЛЬ 1 (Alice, ID: 1) — Фанат Метала и Рока (Слушает только тяжелую музыку)
(1, 1, '2026-01-15 08:30:00'), -- Chop Suey!
(1, 2, '2026-01-15 08:34:00'), -- Toxicity
(1, 3, '2026-02-20 14:15:00'), -- Aerials
(1, 6, '2026-03-01 19:00:00'), -- B.Y.O.B.
(1, 17, '2026-05-10 21:40:00'), -- Sonne
(1, 18, '2026-05-10 21:45:00'), -- Ich Will
(1, 1, '2026-06-01 10:00:00'), -- Повтор Chop Suey!
(1, 2, '2026-06-02 09:15:00'), -- Повтор Toxicity (Недавнее)

-- ПОЛЬЗОВАТЕЛЬ 2 (Bob, ID: 2) — Любитель Электроники (Слушает только Daft Punk)
(2, 12, '2026-02-10 11:00:00'), -- One More Time
(2, 13, '2026-02-10 11:06:00'), -- Aerodynamic
(2, 14, '2026-03-14 16:20:00'), -- Harder, Better, Faster, Stronger
(2, 15, '2026-04-05 23:10:00'), -- Digital Love
(2, 16, '2026-04-05 23:15:00'), -- Something About Us
(2, 12, '2026-05-25 18:00:00'), -- Повтор One More Time
(2, 14, '2026-06-01 22:30:00'), -- Повтор Harder... (Недавнее)

-- ПОЛЬЗОВАТЕЛЬ 3 (Charlie, ID: 3) — Меломан (Слушает абсолютно всё вперемешку)
(3, 1, '2026-04-01 12:00:00'), -- Chop Suey! (Metal)
(3, 12, '2026-04-01 12:04:00'), -- One More Time (House)
(3, 6, '2026-04-12 15:30:00'), -- B.Y.O.B. (Hard Rock)
(3, 16, '2026-04-20 11:15:00'), -- Something About Us (Jazz Fusion)
(3, 19, '2026-05-01 14:00:00'), -- Feuer frei! (Industrial)
(3, 15, '2026-05-18 17:45:00'), -- Digital Love (Electronic)
(3, 9, '2026-06-02 11:00:00'), -- Hypnotize (Rock, Недавнее)

-- ПОЛЬЗОВАТЕЛЬ 4 (Diana, ID: 4) — Слушает только один альбом (Toxicity)
(4, 1, '2026-05-05 09:00:00'), 
(4, 2, '2026-05-05 09:04:00'), 
(4, 3, '2026-05-06 13:12:00'), 
(4, 4, '2026-05-12 18:22:00'), 
(4, 5, '2026-05-12 18:25:00'), 
(4, 1, '2026-06-02 14:00:00'), -- (Недавнее)

-- ПОЛЬЗОВАТЕЛЬ 5 (Evan, ID: 5) — Редкий слушатель (Всего четыре трека под настроение)
(5, 16, '2026-05-20 20:00:00'), -- Something About Us
(5, 10, '2026-05-20 20:04:00'), -- Lonely Day
(5, 15, '2026-05-28 08:30:00'), -- Digital Love
(5, 2, '2026-06-02 15:00:00');  -- Toxicity (Недавнее)

-- Task 3.6
-- 1 adding song with invalid length
insert into songs (title,length_seconds,genre,album_id) VALUES ('a',0,'a',2 );
-- i got ОШИБКА:  новая строка в отношении "songs" нарушает ограничение-проверку "songs_length_seconds_check"
--DETAIL:  Ошибочная строка содержит (25, a, 0, a, 2).
-- Russian


insert into albums (title,release_year) VALUES (
    'a',2006
);
-- i got 
--ОШИБКА:  значение NULL в столбце "artist_id" отношения "albums" нарушает ограничение NOT NULL
--DETAIL:  Ошибочная строка содержит (10, a, 2006, null).

insert into users (name,email,signup_date) VALUES (
    'alice','alice.smith@example.com',NULL
)

-- i got
--ОШИБКА:  повторяющееся значение ключа нарушает ограничение уникальности "users_email_key"
--DETAIL:  Ключ "(email)=(alice.smith@example.com)" уже существует.

-- Task 4.1
SELECT * FROM artists ORDER BY name;

-- Task 4.2
SELECT * FROM songs WHERE length_seconds > 240;

-- Task 4.3
SELECT * FROM albums WHERE release_year BETWEEN 2010 and 2020;

-- Task 4.4
SELECT * FROM songs WHERE title ILIKE '%one%';

-- Task 4.5
SELECT * FROM songs ORDER BY id desc limit 5;

-- Task 4.6
SELECT DISTINCT genre FROM songs;

-- Task 4.7
SELECT * FROM listening_history WHERE played_at > NOW() - INTERVAL '7 days';

-- Task 5.1
SELECT COUNT(*) FROM songs;

-- Task 5.2
SELECT AVG(songs.length_seconds) FROM songs;

-- Task 5.3
SELECT MIN(songs.length_seconds) as short_song,
MAX(songs.length_seconds) as longest_song 
FROM songs;

-- Task 5.4
SELECT album_id,COUNT(*) as songs FROM songs GROUP BY(album_id);

-- Task 5.5
SELECT genre, COUNT(*) FROM songs GROUP BY(genre);

-- Task 5.6
SELECT genre, AVG(songs.length_seconds) FROM songs GROUP BY(genre);

-- TasK 5.7
SELECT genre, COUNT(*) FROM songs GROUP BY(genre)
HAVING COUNT(*) > 3;

-- Task 5.8
SELECT COUNT(*) FROM albums GROUP BY(release_year / 10) * 10;

-- Task 5.9
SELECT user_id, COUNT(*) FROM listening_history GROUP BY(user_id);

-- Task 5.10
SELECT song_id,COUNT(*) FROM listening_history GROUP BY(song_id) ORDER BY COUNT(*) desc LIMIT 1;

-- Task 6.1
SELECT songs.title as songs_title,albums.title as albums_title FROM songs
INNER JOIN albums ON songs.album_id = albums.id;

-- Task 6.2
SELECT artists.name as artist,albums.title as album,songs.title as song
FROM songs 
INNER JOIN albums
ON albums.id = songs.album_id
INNER JOIN artists
ON albums.artist_id = artists.id;

-- Task 6.3
SELECT artists.name, COUNT(albums.id) FROM artists
LEFT JOIN albums 
ON albums.artist_id = artists.id GROUP BY(artists.name);

-- Task 6.4
-- իմ կոդի վրա ցույցա տալիս բոլորին ես կոդով
SELECT artists.name FROM artists
LEFT JOIN albums ON albums.artist_id = artists.id
WHERE albums.id IS NULL;

-- fixed version
SELECT artists.name,COUNT(albums.id) FROM artists
LEFT JOIN albums ON albums.artist_id = artists.id
GROUP BY(artists.name)
HAVING COUNT(albums.id) = 0;

-- Task 6.5
SELECT artists.name,COUNT(songs.id) as songsCount FROM artists
LEFT JOIN albums ON artists.id = albums.artist_id
LEFT JOIN songs ON albums.id = songs.album_id
GROUP BY(artists.name) ORDER BY COUNT(songs.id);

-- Task 6.6
SELECT artists.name, SUM(songs.length_seconds)/ 60 as mins FROM artists
INNER JOIN albums ON artists.id = albums.artist_id
INNER JOIN songs ON albums.id = songs.album_id
GROUP BY(artists.name) ORDER BY mins;

-- Task 6.7
SELECT users.name, COUNT(songs.id) FROM users
INNER JOIN listening_history ON users.id = listening_history.user_id
INNER JOIN songs ON songs.id = listening_history.song_id
GROUP BY(users.name);

-- Task 6.8
