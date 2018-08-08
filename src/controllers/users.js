import User from '../models/user'
import APIError from '../helpers/APIError'

export const signup = (req, res, next) =>
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next)

export const list = (req, res, next) =>
  User.list()
    .then(users => res.send(users))
    .catch(next)

export const load = (req, res, next, username) =>
    User.findByUsername(username)
      .then(user => {
        if (!user) {
          throw new APIError('User does not exists', 404)
        }
        req.user = user
        next()
      })
      .catch(next)

export const exist = (req, res, next) =>
  res.sendStatus(req.user ? 200 : 404)

export const show = (req, res, next) =>
  res.send(req.user)
