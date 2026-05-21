import express from 'express';
import routes from '../src/routes/index.js'
import notFound from './middlewares/notFound.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import env from './config/env.js';

const { PORT } = env;
const app = express();
app.use(express.json())
app.use('/api',routes)


app.use(notFound)
app.use(errorMiddleware);

app.listen(PORT)