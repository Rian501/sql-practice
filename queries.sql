-- Query all of the entries in the Genre table

SELECT * FROM Genre

-- Using the INSERT statement, add one of your favorite artists to the Artist table.
INSERT INTO artist (ArtistId, ArtistName, YearEstablished)
VALUES (29, 'The Arcs', 2009);
-- -- don't have to include the artistID because it was set to auto increment.
-- You can use SELECT along with the INSERT INTO...
-- like:
-- INSERT INTO Album (Title, ReleaseDate, AlbumLength, Label,ArtistId, GenreId)
-- SELECT "Georgetown Station", 1986, 274, "Whatever", ar.ArtistId, g.GenreId
-- FROM Artist ar, Genre genre
-- WHERE ar.ArtistName = "The Model Citizens"
-- AND g.Label = "Rock"


-- Using the INSERT statement, add one, or more, albums by your artist to the Album table.
INSERT INTO album (AlbumId, Title, ReleaseDate, AlbumLength, Label, ArtistId, GenreId)
VALUES (25, 'Yours, Dreamily,', '9/4/2015', 4933, 'Nonesuch', 29, 2);

-- Using the INSERT statement, add some songs that are on that album to the Song table.
INSERT INTO song (SongId, Title, SongLength, ReleaseDate,GenreId,ArtistId,AlbumId)
VALUES (23, 'Outta My Mind', 294, '9/4/2015', 2, 29, 25);
INSERT INTO song (SongId, Title, SongLength, ReleaseDate,GenreId,ArtistId,AlbumId)
VALUES (24, 'Stay in My Corner', 894, '9/4/2015', 2, 29, 25);
INSERT INTO song (SongId, Title, SongLength, ReleaseDate,GenreId,ArtistId,AlbumId)
VALUES (25, 'The Arc', 827, '9/4/2015', 2, 29, 25);
-- Write a SELECT query that provides the song titles, album title, and artist name for all of the data you just entered in. Use the LEFT JOIN keyword sequence to connect the tables, and the WHERE keyword to filter the results to the album and artist you added. Here is some more info on joins that might help.

-- Reminder: Direction of join matters. Try the following statements and see the difference in results.
-- SELECT a.Title, s.Title FROM Album a LEFT JOIN Song s ON s.AlbumId = a.AlbumId;
-- SELECT a.Title, s.Title FROM Song s LEFT JOIN Album a ON s.AlbumId = a.AlbumId;
SELECT r.ArtistName AS 'Artist', a.Title AS 'Album', s.Title AS 'Song'
FROM Artist r, Album a, Song s 
WHERE a.ArtistId = r.ArtistId 
AND s.AlbumId = a.AlbumId
AND artistname = 'The Arcs';


SELECT r.ArtistName AS 'Artist', a.Title AS 'Album', s.Title AS 'Song'
FROM Artist r
LEFT JOIN Album a ON r.artistId = a.artistId
LEFT JOIN Song s ON s.albumId = a.AlbumId
WHERE artistname = 'The Arcs';
-- dont' actually need to use left join on the artist/album, but it does matter on song and ...


-- Write a SELECT statement to display how many songs exist for each album. You'll need to use the COUNT() function and the GROUP BY keyword sequence.
SELECT a.title, COUNT(songId) 'Total Songs'
FROM song s LEFT JOIN album a ON s.AlbumId = a.AlbumId
GROUP BY s.albumId
ORDER BY count(songId) DESC;


-- Write a SELECT statement to display how many songs exist for each artist. You'll need to use the COUNT() function and the GROUP BY keyword sequence.
SELECT COUNT(songId), a.artistname
FROM song s left join artist a ON s.artistid = a.artistid
GROUP BY s.artistId;


-- Write a SELECT statement to display how many songs exist for each genre. You'll need to use the COUNT() function and the GROUP BY keyword sequence.
SELECT COUNT(songId), g.label
FROM song s left join genre g ON s.genreId = g.genreid
GROUP BY s.genreid;


-- Using MAX() function, write a select statement to find the album with the longest duration. The result should display the album title and the duration.
SELECT MAX(albumlength), title
FROM album;

-- Using MAX() function, write a select statement to find the song with the longest duration. The result should display the song title and the duration.
SELECT MAX(songlength), title
FROM song;

-- Modify the previous query to also display the title of the album.

SELECT MAX(songlength), s.title, a.title, ar.artistname
FROM song s left join album a ON s.albumId = a.albumId