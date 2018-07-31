import User from '../models/user'

export const signup = (req, res, next) =>
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next)

export const list = (req, res, next) =>
  User.list()
    .then(users => res.send(users))
    .catch(next)

export const load = (req, res, next, id) =>
  User.findById(id)
    .then(user => {
      if (!user) {
        return next('Not found')
      }
      req.user = user
      next()
    })
    .catch(next)

export const show = (req, res, next) =>
  res.send(req.user)
