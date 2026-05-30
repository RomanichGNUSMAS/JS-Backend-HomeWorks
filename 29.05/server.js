const express = require('express');
const { authorRoutes } = require('./routes/author.route');
const { start } = require('./db');
const { bookRoutes } = require('./routes/book.route');

const app = express();

app.use(express.json());

app.use('/authors',authorRoutes);
app.use('/books',bookRoutes)

app.listen(process.env.PORT, () => {
    start();
    console.log('started...');
})