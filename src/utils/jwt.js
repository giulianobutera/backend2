const jwt = require('jsonwebtoken')
const JWT_SECRET = 'coderhouseBackend2'

// Generar token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

// Verificar token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
