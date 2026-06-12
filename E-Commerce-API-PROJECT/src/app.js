const express = require('express');
const { authRouter } = require('./routes/auth.route');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { productRouter } = require('./routes/product.route');
const { cartRouter } = require('./routes/cart.route');
const { categoryRouter } = require('./routes/category.route');
const app = express();

app.use(express.json());
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/cart',cartRouter);
app.use('/categories', categoryRouter);

app.use(errorMiddleware);

exports.app = app;