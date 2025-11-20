const { Router } = require('express')
const router = Router()
const UserManager = require('../controllers/userManager')
const userManager = new UserManager()

// Crear usuario nuevo
router.post('/', async (req, res) => {
  try {
    const user = await userManager.createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await userManager.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Obtener usuario por ID
router.get('/:uid', async (req, res) => {
  try {
    const user = await userManager.getUserById(req.params.uid)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// Actualizar usuario
router.put('/:uid', async (req, res) => {
  try {
    const updatedUser = await userManager.updateUser(req.params.uid, req.body)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Eliminar usuario
router.delete('/:uid', async (req, res) => {
  try {
    const deletedUser = await userManager.deleteUser(req.params.uid)
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

module.exports = router
