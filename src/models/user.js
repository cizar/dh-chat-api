import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const {
  SALT_WORK_FACTOR
} = process.env

const schema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    match: /^[a-zA-Z0-9]+$/,
    minlength: 3,
    maxlength: 24,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /\S+@\S+\.\S+/,
    unique: true
  }
}, {
  toObject: {
    transform (doc, ret) {
      delete ret.password
    }
  }
})

schema.plugin(uniqueValidator)

schema.pre('save', function (next) {
  const user = this;
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(parseInt(SALT_WORK_FACTOR, 10), function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

schema.methods = {
  comparePassword (candidate) {
    const user = this
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidate, user.password, function (err, match) {
        if (err) return reject(err)
        resolve(match)
      })
    })
  }
}

schema.statics = {
  findByUsername (username) {
    return this.findOne({ username }).exec()
  },
  list () {
    const criteria = {}
    return this.find(criteria).exec()
  }
}

export default mongoose.model('User', schema)
