const authorRoutes = require('express').Router();
const { pool } = require('../db');

authorRoutes.get('/', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM authors;');
        return res.json(result.rows);
    } catch {
        return res.status(500).json({ err:err.message });
    }
})

authorRoutes.get('/mycountry', (req,res) => {
    try {
        const result = pool.query('SELECT * FROM authors where country = $1',['Armenia']);
        return res.json(result.rows);
    } catch (err) {
        res.status(500).json({ err:err.message });
    }
})

authorRoutes.post('/',async (req,res) => {
    const { birth_year,name, country } = req.body;
    try {
        const result = await pool.query('INSERT INTO authors (name,birth_year,country) VALUES ($1,$2,$3) RETURNING *;',[name,birth_year,country]);
        return res.status(201).json(result.rows);
    } catch (err) {
        return res.status(400).json({ err:err.message });
    }
})

exports.authorRoutes = authorRoutes;
