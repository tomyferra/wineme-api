const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Crear el modelo del usuario
const User = mongoose.model('User', UserSchema);

class UserRepository {

  static async create({ email, password }) {
    // Validaciones
    Validation.email(email)
    Validation.password(password)

    // Verificar si el usuario ya existe
    const user = await User.findOne({ email });
    if (user) throw new Error('email already exists');

    // Generar un ID único y encriptar la contraseña
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = new User({
      _id: id,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  }

  // static async findByUsername(email) {
  //   try {
  //     const user = await User.findOne({ email }); // No callback
  //     return user;
  //   } catch (error) {
  //     console.error('Error finding user by username:', error);
  //     throw error;
  //   }
  // }

  static async login ({ email, password}) {
    Validation.email(email)
    Validation.password(password)

    const user = await User.findOne({ email }); // No callback

    if (!user) throw new Error('Email does not exist')
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Password is invalid')
    return user
  }
}

class Validation {
  static email (email){
    // Validaciones
    if (typeof email !== 'string') throw new Error('email must be a string');
    if (email.length < 3) throw new Error('Must be at least 3 characters long');
  }

  static password (password){

    if (typeof password !== 'string') throw new Error('Password must be a string');
    if (password.length < 6) throw new Error('Must be at least 6 characters long');

  }
}

module.exports = { User, UserRepository };