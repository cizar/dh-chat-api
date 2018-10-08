import { Router } from 'express'
import * as ctrl from '../controllers/auth.controller'

const router = Router()

router
  .route('/')
    .post(ctrl.login)

export default router
