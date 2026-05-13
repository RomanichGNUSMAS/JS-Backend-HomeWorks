const fs = require('node:fs');
const express = require('express');

const app = express();

app.use(express.json());

function validate(req, res, next) {
    const { username, email, password, role } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({
            'message': 'invalid arguments'
        })
    }
    if (!username.trim() || !email.trim() || (!password.trim() || password.trim().length < 8)) {
        return res.status(400).json({
            'message': 'invalid arguments'
        })
    }
    next();
}

function isAdmin(req, res, next) {
    const id = +req.headers['user-id']
    const content = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

    const found = content.find(t => t.id === id);
    if (found && found.role === 'admin') {
        return next();
    }
    return res.sendStatus(401);
}

app.get('/api/products', (req, res) => {
    const products = fs.readFileSync('./products.json', 'utf-8');
    res.status(200).send(products);
})

app.get('/api/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    const { id } = req.params;
    for (const product of products) {
        if (product.id == id) {
            return res.status(200).json(product);
        }
    }
    res.status(404).json({ "message": "not found" });
})

app.get('/api/cart/:user_id', (req, res) => {
    const carts = JSON.parse(fs.readFileSync('./carts.json','utf-8'));
    const { user_id } = req.params;
    for (const cart of carts) {
        if (cart.user_id == user_id) {
            return res.status(200).json(cart);
        }
    }
    res.status(404).json({ "message": "not found" });
})

app.get('/api/orders/:id', (req,res) => {
    const { id } = req.params;
    const orders = JSON.parse(fs.readFileSync('./orders.json','utf-8'));
    const found = orders.find(t => t.id == id);
    if(found) {
        return res.status(200).json(found);
    }
    return res.sendStatus(404);
})

app.get('/api/orders/:user_id', (req,res) => {
    const result = [];
    const { user_id } = req.params;
    const orders = JSON.parse(fs.readFileSync('./orders.json','utf-8'));
    for(const order of orders) {
        if(order.user_id == user_id) {
            result.push(order);
        }
    }
    res.status(200).json(result);
})

app.post('/api/users/register', validate, (req, res) => {
    const { username, email, password, role } = req.body;
    const content = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    const found = content.find(t => t.username === username)
    if (found) {
        return res.status(409).json({ message: `user with this name -> ${username} already registered` })
    }
    const date = Date.now()
    if(!role || !role.trim()) {
        return res.status(401).json({ message:"invalid role" });
    }
    if (role.toLowerCase() !== 'admin') {
        content.push({ username, email, password, role: 'customer',id:date,user_id:date })
        fs.writeFileSync('./users.json', JSON.stringify(content,null,2))
        return res.status(201).json({ message: 'successfully created!' })
    }

    content.push({ username, email, password, role: 'admin',id:date,user_id:date });
    fs.writeFileSync('./users.json', JSON.stringify(content,null,2))
    res.status(201).json({ message: 'successfully created!' });
})

app.post('/api/users/login', validate, (req, res) => {
    const { username, email, password } = req.body;
    const find = JSON.parse(fs.readFileSync('./users.json', 'utf-8')).find(t => t.username === username || t.email == email);
    if (find) {
        if (find.password === password) {
            return res.status(200).json({ message: 'login success', id: find.user_id });
        }
        return res.status(409).json({ message: 'invalid password' });
    }
    return res.status(404).json({ message: 'user not found' });
})

app.post('/api/products', isAdmin, (req, res) => {
    const { name, price, quantity } = req.body;
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    if (name && price && quantity) {
        const newProduct = { name, price, quantity,id:Date.now() };
        products.push(newProduct);
        fs.writeFileSync('./products.json', JSON.stringify(products,null,2));
        return res.status(201).json({ message: "created successfully" });
    }
    res.status(400).json({ message: "invalid arguments" });
})

app.post('/api/cart/:user_id', (req, res) => {
    const { user_id } = req.params
    const { product_name } = req.body;
    function addProduct(item) {
        if (!item) return;
        let str = '';
        const productFound = products.find(t => t.name === product_name);
        if (productFound) {
            if (productFound.quantity <= 0) { str += 'out of stock'; return str; }
            productFound.quantity = productFound.quantity <= 0 ? 0 : productFound.quantity - 1;
            const HaveI = item.find(t => t.name == productFound.name)
            if(HaveI) {
               HaveI.quantity++;
               return str; 
            }
            else item.push({...productFound,quantity:1});
        }
        else str += 'product not found';
        return str
    }
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    const carts = JSON.parse(fs.readFileSync('./carts.json', 'utf-8'));

    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    const flag = users.find(t => t.user_id == user_id);
    if (flag) {
        const cartFound = carts.find(t => t.user_id == user_id);
        let str = '';
        if (!cartFound) {
            const newCart = {
                id: Date.now(),
                user_id,
                items: []
            }
            str += addProduct(newCart.items)
            carts.push(newCart);
        }
        else {
            str += addProduct(cartFound.items);
        }
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 2))
        fs.writeFileSync('./carts.json',JSON.stringify(carts,null,2))
        return res.status(201).json({ message:str ? str : "added successfully" });
    }

    res.status(404).json({ message: "user not found" });
})

app.put('/api/products/:id', isAdmin, (req, res) => {
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    const { id } = req.params;
    for (let i = 0; i < products.length; ++i) {
        const { name, price, quantity } = req.body;
        if (products[i].id == id) {
            products[i] = {
                ...products[i],
                name, price, quantity
            }
            fs.writeFileSync('./products.json', JSON.stringify(products,null,2));
            return res.status(201).json({ message: "successfully changed" });
        }
    }
    res.status(404).json({ message: "not found" })
})

app.post('/api/orders/:user_id', (req,res) => {
    const { user_id } = req.params;
    const orders = JSON.parse(fs.readFileSync('./orders.json','utf-8'))
    let carts = JSON.parse(fs.readFileSync('./carts.json','utf-8'));

    const found = carts.find(t => t.user_id == user_id);
    if(found) {
        found.total_sum = found.items.reduce((t,a) => t + a.price ,0);
        found.status = 'pending'
        found.orderDate = Date.now();
        found.id = Date.now();
        orders.push(found);
        carts = carts.filter(t => t != found);
        fs.writeFileSync('./orders.json',JSON.stringify(orders,null,2));
        fs.writeFileSync('./carts.json',JSON.stringify(carts,null,2));
        return res.status(200).json({ message:"successfuly droped to order"});
    } 
    res.status(404).json({ message:"user not found" });   
})

app.put('/api/orders/:id/status',isAdmin, (req, res) => {
    const orders = JSON.parse(fs.readFileSync('./orders.json', 'utf-8'));
    const { id } = req.params;
    const found = orders.find(t => t.user_id == id);
    if (found) {
        found.status = 'shipped';
        fs.writeFileSync('./orders.json', JSON.stringify(orders,null,2));
        return res.status(201).json({ message: "successfully changed" });
    }
    res.status(404).json({ message: "not found" });
})

app.delete('/api/cart/:user_id/items/:product_id', (req, res) => {
    const { user_id, product_id } = req.params;
    const carts = JSON.parse(fs.readFileSync('./carts.json', 'utf-8'));
    for (let i = 0; i < carts.length; ++i) {
        if (carts[i].user_id == user_id) {
            const user_cart = carts[i];
            for(let j = 0;j < user_cart.items.length;++j) {
                if(user_cart.items[j].id == product_id) {
                    user_cart.items.splice(j,1);
                    break;
                }
            }
            fs.writeFileSync('./carts.json', JSON.stringify(carts,null,2));
            return res.status(201).json({ message: "successfully deleted" });
        }
    }
    res.status(404).json({ message: "user not found" });
})

app.delete('/api/products/:id', isAdmin, (req,res) => {
    const { id } = req.params;
    let products = JSON.parse(fs.readFileSync('./products.json','utf-8'));
    products = products.filter(t => t.id != id);
    fs.writeFileSync('./products.json',JSON.stringify(products,null,2));
    res.sendStatus(204)
})

app.delete('/api/cart/:user_id', isAdmin, (req,res) => {
    const { user_id } = req.params;
    let carts = JSON.parse(fs.readFileSync('./carts.json','utf-8'));
    carts = carts.filter(t => t.user_id !== user_id);
    fs.writeFileSync('./carts.json',JSON.stringify(carts,null,2))
    res.sendStatus(204)
})

app.listen(3001)