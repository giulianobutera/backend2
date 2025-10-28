const passport = require('passport')
const local = require('passport-local')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
const User = require('../models/user')

const LocalStrategy = local.Strategy
const JWT_SECRET = 'coderhouseBackend2'

// Estrategia para login local
passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) return done(null, false, { message: 'Usuario no encontrado' })

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) return done(null, false, { message: 'Contraseña incorrecta' })

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
))

// Estrategia JWT para validar token
passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromExtractors([
      ExtractJWT.fromAuthHeaderAsBearerToken(),
      (req) => req?.cookies?.jwt || null
    ]),
    secretOrKey: JWT_SECRET
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id)
      if (!user) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
))

module.exports = passport
