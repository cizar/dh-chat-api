import Channel from '../models/channel'

export const create = (req, res, next) =>
  Channel.create({
    ...req.body,
    owner: req.user.sub,
    members: [req.user.sub]
  })
    .then(channel => res.send(channel))
    .catch(next)

export const list = (req, res, next) =>
  Channel.list()
    .then(channels => res.send(channels))
    .catch(next)

export const load = (req, res, next, id) =>
  Channel.get(id)
    .then(channel => {
      if (!channel) {
        return next('Not found')
      }
      req.channel = channel
      next()
    })
    .catch(next)

export const show = (req, res, next) =>
  res.send(req.channel)

export const destroy = (req, res, next) =>
  req.channel.remove()
    .then(() => res.send('done'))
    .catch(next)

export const postMessage = (req, res, next) =>
  api.messages.create(req.body, req.channel.id)
    .then(message => res.send(message))
    .catch(next)

export const listMessages = (req, res, next) =>
  api.messages.findByChannelId(req.channel.id)
    .then(messages => res.send(messages))
    .catch(next)

export const join = (req, res, next) =>
  req.channel.join(req.user.sub)
    .then(() => res.send('done'))
    .catch(next)

export const listMembers = (req, res, next) =>
  res.send(req.channel.members)

export const leave = (req, res, next) =>
  req.channel.leave(req.user.sub)
    .then(() => res.send('done'))
    .catch(next)
