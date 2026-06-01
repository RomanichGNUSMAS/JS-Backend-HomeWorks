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
    artist_id INTEGER REFERENCES artists(id)
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    length_seconds INTEGER NOT NULL CHECK (length_seconds > 0),
    genre TEXT,
    album_id INTEGER REFERENCES albums(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    signup_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE listening_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    song_id INTEGER REFERENCES songs(id),
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