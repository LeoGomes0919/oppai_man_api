import { Router } from 'express'
import { CreateAccountController } from '../controllers/CreateAccountController'
import { ProfileAccountController } from '../controllers/ProfileAccountController'
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated'

const accountsRoutes = Router()

const createAccountController = new CreateAccountController()
const profileAccountController = new ProfileAccountController()

accountsRoutes.post('/', createAccountController.handle)
accountsRoutes.get(
  '/profile',
  ensureAuthenticated,
  profileAccountController.handle,
)

export { accountsRoutes }
