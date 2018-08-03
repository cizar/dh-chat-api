import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  text: {
    type: String
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
  }
}

export default mongoose.model('Message', schema)
