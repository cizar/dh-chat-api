import { Router } from 'express'

import * as user from '../controllers/users'

const router = Router()

router
  .route('/')
    .post(user.signup)
    .get(user.list)

router
  .param('username', user.load)

router
  .route('/:username')
    .head(user.exist)
    .get(user.show)

export default router
