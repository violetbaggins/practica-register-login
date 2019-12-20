//*****************REQUIRES****************** */
const express = require('express');
const path = require('path');

//************Express **************** */
const app = express();

// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rutas main

app.use('/', mainRouter);

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas
app.use(express.static(__dirname + '/../public')); // para q se vea el CSS

// ************ exports app - dont'touch ************/
module.exports = app;
