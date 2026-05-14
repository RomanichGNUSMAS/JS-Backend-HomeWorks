const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const secret = process.env.API_SECRET;
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'public')));

function validateJWTKEY(req,res,next) {
    const jwtKey = req.headers.authorization;
    try {
        if (!jwtKey.startsWith('Bearer ')) return res.status(401).send('invalid api key');
        const key = jwtKey.split(' ')[1];
        const compare = jwt.verify(key, secret);
        req.user = compare;
        next();
    } catch {
        res.status(401).send('api key expired or not valid')
    }
}

function validateRegister(req, res, next) {
    const { email, password } = req.body;
    let str = '';
    if (!email || !email.trim()) str += 'email required';
    if (!password || !password.trim || password.length < 8) str += ' and password too'
    if (str) return res.status(401).send(str);
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    const found = users.find(user => user.email == email);
    if (found) res.status(409).send('this email exists');
    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    const found = users.find(user => user.email == email);
    if (!found) return res.status(404).send('email is invalid');
    const compare = bcrypt.compareSync(password, found.password);
    if (!compare) res.status(401).send('wrong password');
    next()
}

app.post('/api/register', validateRegister, async (req, res) => {
    const { email, password } = req.body;
    const crypted = await bcrypt.hash(password, 10);
    const newUser = {
        email, password: crypted
    }
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    users.push(newUser);
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.status(201).send('successfully created');
})

app.post('/api/login', validateLogin, (req, res) => {
    const { email } = req.body
    const key = jwt.sign({email}, secret, { expiresIn: '1h' });
    res.send(key)
})

app.get('/api/me', validateJWTKEY,(req, res) => {
    res.status(200).json(req.user);
})

app.get('/api/posts',validateJWTKEY,(req,res) => {
    const posts = [
        'post1','post2'
    ]
    res.json(posts)
})

app.listen(3000)