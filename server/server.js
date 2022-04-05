import express from 'express';
import logger from 'morgan';

const app = express();
const port = 3000;

app.use(logger('dev'));

// NEW: Add json and urlencoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('../client', express.static('client'));