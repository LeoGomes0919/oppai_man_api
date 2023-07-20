import { Router } from 'express'
import { gamesRoutes } from './games.routes'

const gameRouter = Router()

gameRouter.use('/games', gamesRoutes)

export { gameRouter }
