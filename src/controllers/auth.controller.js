import jwt from 'jsonwebtoken'
import { Unauthorized } from 'http-errors'
import User from '../models/user'
import config from '../config'

export const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne().byIdentity(username)
    if (!user) {
      throw Unauthorized('Authentication failed')
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw Unauthorized('Authentication failed')
    }
    const token = jwt.sign({
      username: user.username
    }, config.jwt.secret, {
      issuer: config.jwt.issuer,
      expiresIn: config.jwt.expiresIn,
      subject: user.id
    })
    res.status(201).json({ token })
  } catch (err) {
    next(err)
  }
}
