const fs = require('node:fs');
const express = require('express');

const app = express();

app.use(express.json());

function validate(req, res, next) {
    const { username, email, password, role } = req.body;
    if (!username.trim() || !email.trim() || (password.trim() && password.trim().length >= 8)) {
        return res.status(400).json({
            'message': 'invalid arguments'
        })
    }
    if (role.trim().toLowerCase() == 'customer' || !role.trim() || role.toLowerCase() !== 'admin') {
        const content = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
        content.push({ username, email, password, role: 'customer' })
        return next();
    }

    content.push({ username, email, password, role: 'admin' });
    next();
}

function isAdmin(req, res, next) {
    const id = req['user-id'];
    const content = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

    const found = content.find(t => t.id === id);
    if (found && found.role === 'admin') {
        return next();
    }
    return res.sendStatus(409);
}

app.get('/api/products', (req, res) => {
    const products = fs.readFileSync('./products.json', 'utf-8');
    res.status(200).send(products);
})

app.get('/api/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    const { id } = req;
    for (const product of products) {
        if (product.id == id) {
            return res.status(200).json(JSON.stringify(product));
        }
    }
    res.status(404).json({ "message": "not found" });
})

app.get('/api/cart/:user_id', (req, res) => {
    const carts = JSON.parse(fs.readFileSync('./carts.json'));
    const { user_id } = req;
    for (const cart of carts) {
        if (cart.user_id == user_id) {
            return res.status(200).json(JSON.stringify(cart));
        }
    }
    res.status(404).json({ "message": "not found" });
})

app.post('/api/users/register', validate, (req, res) => {
    const { username, email, password, role } = req.body;
    const content = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    const found = content.find(t => t.username === username)
    if (found) {
        return res.status(409).json(JSON.stringify({ message: `user with this name -> ${username} already registered` }))
    }
    if (role.trim().toLowerCase() == 'customer' || !role.trim() || role.toLowerCase() !== 'admin') {
        content.push({ username, email, password, role: 'customer' })
        return next();
    }

    content.push({ username, email, password, role: 'admin' });
    fs.writeFileSync('./users.json', JSON.stringify(content))
    next();
    res.status(201).json(JSON.stringify({ message: 'successfully created!' }));
})

app.post('/api/users/login', validate, (req, res) => {
    const { username, email, password } = req.body;
    const find = JSON.parse(fs.readFileSync('./users.json', 'utf-8')).find(t => t.username === username || t.email == email);
    if (find) {
        if (find.password === password) {
            return res.status(200).json({ message: 'login success', id: find.user_id });
        }
        return res.status(409).json(JSON.stringify({ message: 'invalid password' }));
    }
    return res.status(404).json({ message: 'user not found' });
})

app.post('/api/products', isAdmin, (req, res) => {
    const { name, price, quantity } = req.body;
    const products = JSON.parse(fs.readFileSync('./user.json', 'utf-8'));
    if (name && price && quantity) {
        const newProduct = { name, price, quantity };
        products.push(newProduct);
        fs.writeFileSync('./products.json',products);
        return res.status(201).json(JSON.stringify({ message:"created successfully" }));
    }
    res.status(400).json(JSON.stringify({ message:"invalid arguments" }));
})

app.put('/api/products/:id', isAdmin, (req,res) => {
    const products = JSON.parse(fs.readFileSync('./user.json', 'utf-8'));
    const { id } = req;
    for(let i = 0;i < products.length;++i) {
        const { name,price,quantity } = req.body;
        if(products[i].id == id) {
            products[i] = {
                ...products[i],
                name,price,quantity
            }
            fs.writeFileSync('./products.json', products);
            return res.status(201).json(JSON.stringify({ message:"successfully changed" }));
        }
    }
    res.status(404).json(JSON.stringify({ message:"not found"}))
})


app.put('/api/orders/:id', (req,res) => {
    const orders = JSON.parse(fs.readFileSync('./orders.json','utf-8'));
    const { id } = req;
    const found = orders.find(t => t.id == id);
    if(found) {
        found.status = 'shipped';
        fs.writeFileSync('./orders.json',JSON.stringify(orders));
        return res.status(201).json(JSON.stringify({ message:"successfully changed" }));
    }
    res.status(404).json(JSON.stringify({ message:"not found" }));
})

app.delete('/api/cart/:user_id/items/:product_id', (req,res) => {
    const { user_id,product_id } = req;
    const carts = JSON.parse(fs.readFileSync('./carts.json','utf-8'));
    const userFound = carts.find(t => t.user_id === user_id);
    if(userFound) {
        const cartFound = userFound.find(t => t.product_id === product_id);
        if(cartFound) {
            usersFound = usersFound.filter(t => t !== cartFound);
            return res.status(204).json(JSON.stringify({ message:"product deleted", product,cartFound }));
        }
        return res.status(404).json(JSON.stringify({ message:"product not found" }));
    }
    res.status(404).json(JSON.stringify({ message:"user not found" }));
})