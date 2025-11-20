const bcrypt = require('bcrypt')
const User = require('../models/user')

class UserManager {
  // Crear usuario nuevo
  async createUser(data) {
    try {
      const { first_name, last_name, email, age, password, cart, role } = data
      const existingUser = await User.findOne({ email })
      if (existingUser) throw new Error('El email ya está registrado, ingrese uno diferente.')

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        cart,
        role
      })

      return await newUser.save()
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message)
    }
  }

  // Obtener todos los usuarios
  async getUsers() {
    try {
      return await User.find().populate('cart')
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message)
    }
  }

  // Obtener usuario por ID
  async getUserById(id) {
    try {
      const user = await User.findById(id).populate('cart')
      if (!user) throw new Error('Usuario no encontrado')
      return user
    } catch (error) {
      throw new Error('Error al obtener el usuario: ' + error.message)
    }
  }

  // Actualizar usuario
  async updateUser(id, data) {
    try {
      if (data.password) data.password = await bcrypt.hash(data.password, 10)
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
      if (!updatedUser) throw new Error('Usuario no encontrado')
      return updatedUser
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message)
    }
  }

  // Eliminar usuario
  async deleteUser(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) throw new Error('Usuario no encontrado')
      return deletedUser
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message)
    }
  }
}

module.exports = UserManager
