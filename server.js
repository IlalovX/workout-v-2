import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import authRoutes from './app/auth/auth.routes.js'
import exercisesRoutes from './app/exercise/exercise.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import prisma from './app/prisma.js'
import userRoutes from './app/user/user.routes.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())

	const __dirname = path.resolve()

	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

	app.use('/api/auth', authRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/exercises', exercisesRoutes)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 3000

	app.listen(PORT, () => {
		console.log('Server is running on http://localhost:3000')
	})
}
main()
	.then(async () => {
		process.on('SIGINT', async () => {
			await prisma.$disconnect()
			process.exit(0)
		})
	})
	.catch(error => {
		console.error('Error starting the server:', error)
		process.exit(1)
	})
