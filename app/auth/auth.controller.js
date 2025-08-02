import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import prisma from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'
import { generateToken } from './generate-token.js'

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await prisma.user.findUnique({
		where: { email }
	})

	const isValidPassword = await verify(user.password, password)

	if (user && isValidPassword) {
		const token = generateToken(user)
		return res.json({ user, token })
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const isHaveUser = await prisma.user.findUnique({
		where: { email }
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			name: faker.company.name(),
			email,
			password: await hash(password)
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
