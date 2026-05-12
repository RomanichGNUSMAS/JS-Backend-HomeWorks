const fs = require('node:fs');
const express = require('express');

const app = express();

app.use(express.json());

function validate(req,res,next) {
    const { username,email,password,role } = req.body;
    if(!username.trim() || !email.trim() || (password.trim() && password.trim().length >= 8)) {
        next({
            'message' : 'invalid registration'
        })
        return;
    }
    if(!role.trim() || role.toLowerCase() !== 'admin') {
        const content = JSON.parse(fs.readFileSync('./users.json','utf-8'));
        content.push({username,email,password,role:'customer'})
    }
}

app.get('/api/products', (req,res) => {
    const products = fs.readFileSync('./products.json','utf-8');
    res.status(200).send(products);
})

app.get('/api/products/:id', (req,res) => {
    const products = JSON.parse(fs.readFileSync('./products.json','utf-8'));
    const { id } = req;
    for(const product of products) {
        if(product.id == id) {
            return res.status(200).json(JSON.stringify(product));
        }
    }
    res.status(404).json({ "message":"not found" });
})

app.get('/api/cart/:user_id', (req,res) => {
    const carts = JSON.parse(fs.readFileSync('./carts.json'));
    const { user_id } = req;
    for(const cart of carts) {
        if(cart.user_id == user_id) {
            return res.status(200).json(JSON.stringify(cart));
        }
    }
    res.status(404).json({ "message":"not found" });
})

app.post('/api/users/register', validate, (req,res) => {

})