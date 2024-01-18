import express, { Router } from 'express';
import ejs from 'ejs';
import path from 'path';
import { router } from './backend/src/app.router.js';


const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(),'frontend/views'))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(path.resolve(),'public')))

app.use('/', router);

export default app;
