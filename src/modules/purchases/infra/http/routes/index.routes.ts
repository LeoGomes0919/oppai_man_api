import { Router } from 'express'
import { purchasesRoutes } from './purchases.routes'

const purchaseRouter = Router()

purchaseRouter.use('/purchase', purchasesRoutes)

export { purchaseRouter }
