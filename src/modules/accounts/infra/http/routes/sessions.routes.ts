import { Router } from 'express'
import { CreateAccountSessionController } from '../controllers/CreateAccountSessionController'
import { AccountRefreshTokenController } from '../controllers/AccountRefreshTokenController'

const createAccountSessionController = new CreateAccountSessionController()
const accountRefreshTokenController = new AccountRefreshTokenController()

const sessionsRoutes = Router()

sessionsRoutes.post('/', createAccountSessionController.handle)
sessionsRoutes.post('/refresh-token', accountRefreshTokenController.handle)

export { sessionsRoutes }
