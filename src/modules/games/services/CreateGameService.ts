import { inject, injectable } from 'tsyringe'
import { IGamesRepository } from '../repositories/IGamesRepository'
import { OperationalSystem } from '../dtos/ICreateGameDTO'
import { IAccountsRepository } from '@/modules/accounts/repositories/IAccountsRepository'
import { AppError } from '@/shared/errors/AppError'

interface IRequest {
  title: string
  description: string
  short_description?: string
  developer_id: string
  genres: string[]
  operating_systems: OperationalSystem[]
  build_number: string
  version: string
  size: string
  page_url?: string
  is_free: boolean
  price: number
}

@injectable()
export class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute(data: IRequest): Promise<{ id: string }> {
    const account = await this.accountsRepository.findById(data.developer_id)

    if (!account?.developer) {
      throw new AppError('Developer not found', 400)
    }

    const genresExists = await this.gamesRepository.findGenresByIds(data.genres)

    if (genresExists.length !== data.genres.length) {
      throw new AppError('One or more genres not found', 400)
    }

    const dataAssingValue = Object.assign(data, {
      developer_id: account.developer.id,
      page_url: data.page_url,
    })

    const game = await this.gamesRepository.create(dataAssingValue)

    return {
      id: game.id,
    }
  }
}
