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
  listByChannelId (id, since) {
    const query = { channel: id }
    if (since) {
      query['_id'] = { '$gt': since }
    }
    return this.find(query)
      .sort('-_id')
      .populate('author', 'username')
  }
}

export default mongoose.model('Message', schema)
