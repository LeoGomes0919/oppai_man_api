import { Router } from 'express'
import { accountRouter } from '@/modules/accounts/infra/http/routes/index.routes'
import { gameRouter } from '@/modules/games/infra/http/routes/index.routes'
import { purchaseRouter } from '@/modules/purchases/infra/http/routes/index.routes'

const routes = Router()

routes.use(accountRouter)
routes.use(gameRouter)
routes.use(purchaseRouter)

export { routes }
