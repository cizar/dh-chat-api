import { NotFound } from 'http-errors'
import User from '../models/user'

export const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

export const list = async (req, res, next) => {
  try {
    const items = await User.find({})
    res.json(items)
  } catch (err) {
    next(err)
  }
}

export const load = async (req, res, next, identity) => {
  try {
    const user = await User.findOne().byIdentity(identity)
    if (!user) {
      return next(NotFound('User does not exists'))
    }
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export const exist = async (req, res) =>
  res.sendStatus(200)

export const show = async (req, res) =>
  res.send(req.user)
