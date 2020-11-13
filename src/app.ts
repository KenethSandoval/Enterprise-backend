import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes'

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/api', routes);

export default app;
