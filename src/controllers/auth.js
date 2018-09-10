import jwt from 'jsonwebtoken'
import { BadRequest } from 'http-errors'
import User from '../models/user'
import config from '../config'

export const login = (req, res, next) =>
  User.get(req.body.username)
    .then(user => {
      if (!user) {
        throw BadRequest('Login failed')
      }
      return user.comparePassword(req.body.password)
        .then(match => {
          if (!match) {
            throw BadRequest('Login failed')
          }
          const token = jwt.sign({
            username: user.username
          }, config.jwt.secret, {
            issuer: config.jwt.issuer,
            expiresIn: config.jwt.expiresIn,
            subject: user.id
          })
          res.status(201).send({ token })
        })
    })
    .catch(next)
