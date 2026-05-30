const bookRoutes = require('express').Router();
const { pool } = require('../db');

bookRoutes.get('/', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY price;');
        return res.json(result.rows);
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

bookRoutes.get('/lowprice', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE price <= 20;');
        return res.json(result.rows);
    } catch (err) {
        return res.status(500).json({ err:err.message });
    }
})

bookRoutes.get('/qichinfo', (req,res) => {
    try {
        const result = pool.query('SELECT title,price from books;');
        return res.json(result.rows);
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

bookRoutes.get('/recentyladded', (req,res) => {
    try {
        const result = pool.query('SELECT * FROM books ORDER BY created_at LIMIT 3;');
        return res.json(result.rows);
    } catch (err) {
        res.status(500).json({ err:err.message })
    }
})

bookRoutes.get('/notinstock', (req,res) => {
    try {
        const result = pool.query('SELECT * FROM books where NOT in_stock;')
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ err:err.message })
    }
})

bookRoutes.put('/increase', async (req,res) => {
    try {
       await pool.query('UPDATE books SET price = price * 1.10;');
       return res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

bookRoutes.put('/sepincrease', async (req,res) => {
    try {
        await pool.query('UPDATE books SET in_stock = false WHERE price > 50;')
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

bookRoutes.delete('/',(req,res) => {
    const { name } = req.body;
    if(!name) return res.status(400).json({ err:"invalid name" });
    try {
        const result = pool.query('DELETE FROM books where title = $1',[name]);
        res.status(204).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

bookRoutes.post('/', async (req,res) => {
    const { title,author_id,price,date} = req.body;
    try { 
        const result = await pool.query('INSERT INTO books (title,author_id,price,created_at,published_date) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
            [title,author_id,price,date || null,new Date().toLocaleString().split(',')[0].split('.').join('-')]
        );
        return res.status(201).json(result.rows)
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

exports.bookRoutes = bookRoutes;