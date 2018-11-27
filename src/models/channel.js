import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
  topic: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

schema.statics = {
  get (id) {
    return this.findById(id)
      .populate('owner')
      .populate('members')
      .exec()
  },
  list () {
    const pipeline = [{
      '$project': {
        'topic': '$topic',
        'members': {
          '$size': '$members'
        }
      }
    }]
    return this.aggregate(pipeline)
      .exec()
  }
}

schema.methods = {
  join (user_id) {
    return this.update({
      '$addToSet': {
        'members': user_id
      }
    })
  },
  leave (user_id) {
    return this.update({
      '$pull': {
        'members': user_id
      }
    })
  }
}

export default mongoose.model('Channel', schema)
