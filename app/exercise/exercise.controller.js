import asyncHandler from 'express-async-handler'
import prisma from '../prisma.js'

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	const newExercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})

	res.status(201).json(newExercise)
})

export const updateExercise = asyncHandler(async (req, res) => {
	const { id } = req.params
	const { name, times, iconPath } = req.body

	try {
		const updatedExercise = await prisma.exercise.update({
			where: { id: Number(id) },
			data: {
				name,
				times,
				iconPath
			}
		})

		res.json(updatedExercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

export const deleteExercise = asyncHandler(async (req, res) => {
	const { id } = req.params

	try {
		const exercise = await prisma.exercise.delete({
			where: { id: Number(id) }
		})

		res.status(204).send({ message: 'Exercise deleted successfully' })
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(exercises)
})
