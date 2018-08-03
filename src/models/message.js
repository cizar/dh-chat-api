import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  text: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }
}, {
  timestamps: true
})

schema.statics = {
  listByChannelId (id) {
    return this.find({ channel: id })
      .populate('author')

  }
}

export default mongoose.model('Message', schema)
