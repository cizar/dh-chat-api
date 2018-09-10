import { NotFound } from 'http-errors'
import User from '../models/user'

export const signup = (req, res, next) =>
  User.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(next)

export const list = (req, res, next) =>
  User.list()
    .then(users => res.send(users))
    .catch(next)

export const load = (req, res, next, id) =>
    User.get(id)
      .then(user => {
        if (!user) {
          throw NotFound('User does not exists')
        }
        req.user = user
        next()
      })
      .catch(next)

export const exist = (req, res, next) =>
  res.sendStatus(req.user ? 200 : 404)

export const show = (req, res, next) =>
  res.send(req.user)
