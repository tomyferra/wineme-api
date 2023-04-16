// conexion a la base de datos
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONG_URI)
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

module.exports = mongoose;