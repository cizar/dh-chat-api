import { Router } from 'express'

import authRouter from './auth'
import usersRouter from './users'
import channelsRouter from './channels'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/channels', channelsRouter)

export default router
