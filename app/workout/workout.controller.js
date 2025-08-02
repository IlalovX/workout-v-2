import asyncHandler from 'express-async-handler'
import prisma from '../prisma.js'

export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})
	res.json(workouts)
})

export const getWorkoutById = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: { userId: req.user.id },
		include: {
			exercises: true
		}
	})
	const minutes = Math.floor(workout.exercises.length * 3.7)

	res.json({ ...workout, minutes })
})

export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const newWorkout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: Number(id) }))
			}
		}
	})

	res.status(201).json(newWorkout)
})

export const updateWorkout = asyncHandler(async (req, res) => {
	const { id } = req.params
	const { name, exerciseIds } = req.body

	try {
		const updatedWorkout = await prisma.workout.update({
			where: { id: Number(id) },
			data: {
				name,
				exercises: {
					set: exerciseIds.map(id => ({ id: Number(id) }))
				}
			}
		})

		res.json(updatedWorkout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})

export const deleteWorkout = asyncHandler(async (req, res) => {
	const { id } = req.params

	try {
		await prisma.workout.update({
			where: { id: Number(id) }
		})

		res.status(204).send({ message: 'Exercises deleted successfully' })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
