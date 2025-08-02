import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getUserProfile } from './user.controller.js'

const router = Router()

router.route('/profile').get(protect, getUserProfile)

export default router
