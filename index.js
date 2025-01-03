
const express = require ('express');
const morgan  = require('morgan');
const path = require('path');
const {mongoose} = require('./database')
const app = express();
require('dotenv').config(); // Cargar variables de entorno
const cors = require("cors");


//settings
app.set('port', process.env.PORT || 5001);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//Routes
app.use('/api/wines',require('./routes/wines.routes'));
app.use('/user',require('./routes/login.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')))


//Starting the server
// to run dev server: npm run dev
app.listen(app.get('port'), () => {
  console.log(`Server on port: ${app.get('port')}`);
});