import { NotFound } from 'http-errors'
import Channel from '../models/channel'
import Message from '../models/message'

export const create = (req, res, next) =>
  Channel.create({
    ...req.body,
    owner: req.user.sub,
    members: [req.user.sub]
  })
    .then(channel => res.status(201).send(channel))
    .catch(next)

export const list = (req, res, next) =>
  Channel.list()
    .then(channels => res.send(channels))
    .catch(next)

export const load = (req, res, next, id) =>
    Channel.get(id)
      .then(channel => {
        if (!channel) {
          throw NotFound('Channel does not exists')
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
  Message.create({
    ...req.body,
    channel: req.channel.id,
    author: req.user.sub
  })
    .then(message => res.status(201).send(message))
    .catch(next)

export const listMessages = (req, res, next) =>
  Message.listByChannelId(req.channel.id, req.query.since)
    .then(messages => res.send(messages))
    .catch(next)

export const join = (req, res, next) =>
  req.channel.join(req.user.sub)
    .then(() => res.status(201).send('done'))
    .catch(next)

export const listMembers = (req, res, next) =>
  res.send(req.channel.members)

export const leave = (req, res, next) =>
  req.channel.leave(req.user.sub)
    .then(() => res.send('done'))
    .catch(next)
