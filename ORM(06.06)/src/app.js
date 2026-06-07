const express = require('express');
const { prisma } = require('./configs/db'); 
const { authRouter } = require('./routes/auth.route');

const app = express();
app.use(express.json())
app.use('/auth',authRouter);

exports.app = app;
