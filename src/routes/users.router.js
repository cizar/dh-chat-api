import { Router } from 'express'
import * as ctrl from '../controllers/users.controller'

const router = Router()

router
  .route('/')
    .post(ctrl.signup)
    .get(ctrl.list)

router
  .param('identity', ctrl.load)

router
  .route('/:identity')
    .head(ctrl.exist)
    .get(ctrl.show)

export default router
