const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const handlebars = require("express-handlebars");
require('dotenv').config();

// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

app.use('/api/v1', router);
app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

app.set('view engine', 'handlebars');   
app.set("views", __dirname+"/views");
app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: "index"
}));

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
