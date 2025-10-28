const { Router } = require('express')
const passport = require('passport')
const UserManager = require('../userManager')
const { generateToken } = require('../utils/jwt')

const router = Router()
const userManager = new UserManager()

// Crear usuario nuevo
router.post('/register', async (req, res) => {
  try {
    const user = await userManager.createUser(req.body)
    res.status(201).json({ message: 'Usuario registrado', user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Login de usuario
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(400).json({ message: info?.message || 'Login fallido' })

    const token = generateToken(user)

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })

    res.status(200).json({
      message: 'Login exitoso',
      token
    })
  })(req, res, next)
})

// Ruta protegida con JWT
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    message: 'Usuario autenticado correctamente',
    user: req.user
  })
})

module.exports = router
