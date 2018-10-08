import { Router } from 'express'
import * as ctrl from '../controllers/channels.controller'

const router = Router()

router
  .route('/')
    .post(ctrl.create)
    .get(ctrl.list)

router.param('channel_id', ctrl.load)

router
  .route('/:channel_id')
    .get(ctrl.show)
    .delete(ctrl.destroy)

router
  .route('/:channel_id/messages')
    .post(ctrl.postMessage)
    .get(ctrl.listMessages)

router
  .route('/:channel_id/members')
    .post(ctrl.join)
    .get(ctrl.listMembers)
    .delete(ctrl.leave)

export default router
