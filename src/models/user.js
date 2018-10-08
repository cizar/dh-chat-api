import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import config from '../config'

const { Schema, Types } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /\S+@\S+\.\S+/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9]+$/,
    minlength: 3,
    maxlength: 24
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.password
    }
  }
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(config.bcrypt.saltRounds, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      this.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

userSchema.query.byIdentity = async function (identity) {
  if (!identity) {
    throw Error('Invalid identity')
  }
  const $or = [
    { username: identity },
    { email: identity }
  ]
  if (Types.ObjectId.isValid(identity)) {
    $or.push({ _id: identity })
  }
  return this.findOne({ $or })
}

const userModel = mongoose.model('User', userSchema)

export default userModel
