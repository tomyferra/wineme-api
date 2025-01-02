const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { UserRepository, User } = require('../models/user'); // Ajusta la ruta según tu estructura
const cookieParser = require('cookie-parser');
const SECRET_KEY = process.env.JWT_SECRET;

const app = express();
app.use(cookieParser())

// Api home page
router.get('/', async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');

  const users = await User.find();
  res.send(users) // prints all users and their hashed passwords.

});

// Ruta de registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await UserRepository.create({ email, password });
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserRepository.login({email, password});

    // Genera el JWT
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res
      .cookie('access_token', token, {
        httpOnly:  true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      .send({ user, token });

  } catch (error) {
    res.status(401).send(error.message );
  }
});


module.exports = router;