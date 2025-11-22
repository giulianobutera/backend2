const { Router } = require('express')
const router = Router()
const userController = require('../controllers/user.controller')

// Crear usuario nuevo
router.post('/', userController.createUser)

// Obtener todos los usuarios
router.get('/', userController.getUsers)

// Obtener usuario por ID
router.get('/:uid', userController.getUserById)

// Actualizar usuario
router.put('/:uid', userController.updateUser)

// Eliminar usuario
router.delete('/:uid', userController.deleteUser)

module.exports = router
