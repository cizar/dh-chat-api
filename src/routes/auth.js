import { Router } from 'express'

import * as auth from '../controllers/auth'

const router = Router()

router
  .route('/')
    .post(auth.login)

export default router
