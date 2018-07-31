import { Router } from 'express'

import * as channel from '../controllers/channels'

const router = Router()

router
  .route('/')
    .post(channel.create)
    .get(channel.list)

router.param('channel_id', channel.load)

router
  .route('/:channel_id')
    .get(channel.show)
    .delete(channel.destroy)

router
  .route('/:channel_id/messages')
    .post(channel.postMessage)
    .get(channel.listMessages)

router
  .route('/:channel_id/members')
    .post(channel.join)
    .get(channel.listMembers)
    .delete(channel.leave)

export default router
