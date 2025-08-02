import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkoutById,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'

const router = Router()

router.route('/').post(protect, createNewWorkout).get(protect, getWorkouts)
router
	.route('/:id')
	.get(protect, getWorkoutById)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

export default router
