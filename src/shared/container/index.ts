import { container } from 'tsyringe'
import { IAccountsRepository } from '@/modules/accounts/repositories/IAccountsRepository'
import { AccountsRepository } from '@/modules/accounts/infra/prisma/repositories/AccountsRepository'
import { IAccountsSessionRepository } from '@/modules/accounts/repositories/IAccountsSessionRepository'
import { AccountsSessionRepository } from '@/modules/accounts/infra/prisma/repositories/AccountsSessionRepository'
import { IGamesRepository } from '@/modules/games/repositories/IGamesRepository'
import { GamesRepository } from '@/modules/games/infra/prisma/repositories/GamesRepository'

import './providers'
import { IPurchasesRepository } from '@/modules/purchases/repositories/IPurchasesRepository'
import { PurchasesRepository } from '@/modules/purchases/infra/prisma/repositories/PurchasesRepository'

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
)
container.registerSingleton<IAccountsSessionRepository>(
  'AccountsSessionRepository',
  AccountsSessionRepository,
)
container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
)
container.registerSingleton<IPurchasesRepository>(
  'PurchasesRepository',
  PurchasesRepository,
)
