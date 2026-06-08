const express = require('express');
const { prisma } = require('./configs/db'); 
const { authRouter } = require('./routes/auth.route');
const { errorMiddleware } = require('./middlewares/auth.middleware');

const app = express();
app.use(express.json())
app.use('/auth',authRouter);

app.use(errorMiddleware)
exports.app = app;
