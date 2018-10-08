import { Router } from 'express'
import authRouter from './auth.router'
import usersRouter from './users.router'
import channelsRouter from './channels.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/channels', channelsRouter)

export default router
