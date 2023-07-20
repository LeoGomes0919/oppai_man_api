import { Router } from 'express'

import { accountsRoutes } from './accounts.routes'
import { sessionsRoutes } from './sessions.routes'

const accountRouter = Router()

accountRouter.use('/accounts', accountsRoutes)
accountRouter.use('/sessions', sessionsRoutes)

export { accountRouter }
