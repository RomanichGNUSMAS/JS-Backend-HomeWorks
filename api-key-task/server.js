const express = require('express');
const fs = require('node:fs');

const app = express();

app.use(express.json())

function validateAPIKey(req, res, next) {
    const createdUsers = JSON.parse(fs.readFileSync('./createdUsers.json', 'utf-8'));
    const apikey = req.headers['x-api-key']
    if (!apikey || !apikey.trim()) {
        return res.status(401).send('api key required');
    }
    const found = createdUsers.find(t => t.apikey == apikey);
    if (!found) {
        return res.status(401).send('invalid api key');
    }
    next();
} 

function validateUserPermissions(permission) {
    return function (req, res, next) {
        const apikey = req.headers['x-api-key'];
        const users = JSON.parse(fs.readFileSync('./createdUsers.json', 'utf-8'));
        const found = users.find(t => t.apikey == apikey);
        if (!found) {
            return res.status(401).send('user not found or it is not your api key');
        }
        const [...UserPermissions] = found.permissions;
        if (!UserPermissions.find(userPermission => userPermission == permission)) {
            return res.status(403).send('you don\'t have that permission');
        }
        next();
    }
}

app.get('/api/products', validateAPIKey, validateUserPermissions('read'), (req, res) => {
    res.status(200).send('some products');
})

app.post('/api/products', validateAPIKey, validateUserPermissions('write'), (req, res) => {
    res.status(201).json({ ...req.body, id: Date.now() });
})

app.get('/status', (req,res) => {
    res.status(200).send('server is up');
})
app.listen(3000)