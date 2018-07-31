import User from '../models/user'
import jwt from 'jsonwebtoken'

const {
  JWT_SECRET,
  JWT_ISSUER,
  JWT_EXPIRES_IN
} = process.env

export const login = (req, res, next) =>
  User.findByUsername(req.body.username)
    .then(user => {
      if (!user) {
        throw new Error('Login failed')
      }
      return user.comparePassword(req.body.password)
        .then(match => {
          if (!match) {
            throw new Error('Login failed')
          }
          const token = jwt.sign({
            username: user.username
          }, JWT_SECRET, {
            issuer: JWT_ISSUER,
            expiresIn: JWT_EXPIRES_IN,
            subject: user.id
          })
          res.send({ token })
        })
    })
    .catch(next)
