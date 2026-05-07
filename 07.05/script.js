const http = require('node:http');
const { binarySearchByID, validator } = require('./handlers');

const books = [];
const allowedMethods = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
]

const server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const { method, url } = req;
    if (method === 'GET') {
        if (url === '/books') {
            res.writeHead(200);
            return res.end(JSON.stringify(books));
        } else if (url.startsWith('/books/')) {
            const [, , id] = url.split('/');
            const idx = binarySearchByID(books, Number(id));
            if (idx >= 0) {
                res.writeHead(200);
                return res.end(JSON.stringify(books[idx]));
            }
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'not found' }));
        } else {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'bad request' }));
        }
    }
    if (method === 'POST') {
        let chunk = ''
        req.on('data', (data) => chunk += data)
        req.on('end', () => {
            if (url === '/books') {
                try {
                    const body = JSON.parse(chunk)
                    const { title, author, year } = body;
                    console.log(title, author, year)
                    if (!validator(body)) {
                        res.writeHead(422);
                        return res.end('invalid arguments');
                    }
                    const newBook = {
                        id: Date.now(),
                        title,
                        author,
                        year
                    }
                    books.push(newBook);
                    res.writeHead(201);
                    return res.end('successfully added a book');
                } catch {
                    res.writeHead(400);
                    return res.end('bad request')
                }
            }
            else {
                res.writeHead(400);
                return res.end('bad request');
            }
        })
        return;
    }
    if (method === "PUT") {
        if (url.startsWith('/books/')) {
            let request = '';
            req.on('data', chunk => request += chunk);

            req.on('end', function () {
                try {
                    const body = JSON.parse(request);
                    const [, , id] = url.split('/');
                    if (!validator(body) || !id) {
                        res.writeHead(422);
                        return res.end('invalid arguments');
                    }
                    const idx = binarySearchByID(books, Number(id));
                    if (idx >= 0) {
                        books[idx] = { ...body, id: books[idx].id };
                        res.writeHead(200);
                        return res.end(JSON.stringify({ message: `successfully changed a book with id ${id}` }));
                    }
                    res.writeHead(404);
                    return res.end(JSON.stringify({ error: `book with id ${id} not found` }));
                } catch {
                    res.writeHead(400);
                    return res.end('bad request')
                }
            })
            return
        } else {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'bad request' }));
        }
    }
    if (method === 'PATCH') {
        if (url.startsWith('/books/')) {
            let request = '';
            req.on('data', chunk => request += chunk);
            req.on('end', function () {
                const id = url.split('/')[2];
                const targetId = Number(id);
                if (!id || Number.isNaN(targetId)) {
                    res.writeHead(422);
                    return res.end(JSON.stringify({ error: 'invalid id' }));
                }

                const body = JSON.parse(request);
                const idx = binarySearchByID(books, targetId);
                if (idx < 0) {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ error: `book with id ${id} not found` }));
                }

                const book = books[idx];
                if ('title' in body) book.title = body.title;
                if ('author' in body) book.author = body.author;
                if ('year' in body) book.year = body.year;

                res.writeHead(200);
                return res.end(JSON.stringify(book));
            });
        }
        else {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'bad request' }));
        }
    }
    if (method === "DELETE") {
        if (url.startsWith('/books/')) {
            const [, , id] = url.split('/');
            const idx = binarySearchByID(books, Number(id));

            if (idx < 0) {
                res.writeHead(404);
                return res.end(JSON.stringify({ error: 'not found' }));
            }
            for (let i = idx; i < books.length - 1; ++i) {
                [books[i], books[i + 1]] = [books[i + 1], books[i]];
            }
            books.pop();
            res.writeHead(204);
            return res.end();
        }
    }

    if (method === 'OPTIONS') {
        if (url === '/books') {
            res.setHeader('Allow', allowedMethods.join(', '));
            res.writeHead(204);
            return res.end();
        }
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'not found' }));
})

server.listen(3000);