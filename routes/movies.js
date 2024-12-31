import { Router } from 'express'
import { MovieControllers } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieControllers.getAll)
moviesRouter.get('/:id', MovieControllers.getById)
moviesRouter.post('/', MovieControllers.create)
moviesRouter.patch('/:id', MovieControllers.update)
moviesRouter.delete('/:id', MovieControllers.delete)
