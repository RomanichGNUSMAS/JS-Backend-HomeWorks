const express = require('express');
const path = require('node:path');
const app = express();

const users = [{ name: "James", password: 'pass1234' }, { name: "Mickle", password: "micky1987" }, { name: "Roman", password: "roman350" }];

app.use((req, res, next) => {
  if (req.path !== '/api/login' && req.path !== '/api/info') return next()
  const head = req.headers.authorization;
  if (!head.trim() || !head.startsWith('Basic ')) {
    return res.status(401).send('invalid auth')
  }
  const header = head.split(' ')[1];
  const buffer = Buffer.from(header, 'base64').toString();
  const [name, password] = buffer.split(':');
  if (!name.trim() || !password.trim()) {
    return res.status(401).send('name and password required');
  }
  req.name = name;
  req.password = password;
  next();
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/login', (req, res) => {
  const { name, password } = req;
  const found = users.find(user => user.name == name);
  if (found) {
    if (found.password == password) {
      return res.status(200).send(`hello dear ${found.name}`);
    }
    return res.status(401).send('invalid password try again');
  }
  res
    .status(401)
    .set('WWW-Authenticate', 'Basic')
    .send('Auth required');
})

app.get('/api/public', (req,res) => {
  res.send("hello dear user");
})

app.get('/api/info', (req,res) => {
  
})

app.listen(3000)