import { Router } from 'express'

import * as user from '../controllers/users'

const router = Router()

router
  .route('/')
    .post(user.signup)
    .get(user.list)

router
  .param('id', user.load)

router
  .route('/:id')
    .get(user.show)


export default router
