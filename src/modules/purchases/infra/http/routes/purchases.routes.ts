import { Router } from 'express'
import { CreatePurchaseController } from '../controllers/CreatePurchaseController'
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated'
import { FindAllPurchaseByUserController } from '../controllers/FindAllPurchaseByUserController'
import { UpdateStatusPurchaseController } from '../controllers/UpdateStatusPurchaseController'
import { FindPurchaseByIdController } from '../controllers/FindPurchaseByIdController'

const purchasesRoutes = Router()

const createPurchaseController = new CreatePurchaseController()
const findByUserController = new FindAllPurchaseByUserController()
const findPurchaseByIdController = new FindPurchaseByIdController()
const updateStatusPurchaseController = new UpdateStatusPurchaseController()

purchasesRoutes.use(ensureAuthenticated)
purchasesRoutes.post('/', createPurchaseController.handle)
purchasesRoutes.get('/history', findByUserController.handle)
purchasesRoutes.patch('/update/:id', updateStatusPurchaseController.handle)
purchasesRoutes.get('/:id', findPurchaseByIdController.handle)

export { purchasesRoutes }
