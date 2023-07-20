import { inject, injectable } from 'tsyringe'
import { IGamesRepository } from '../repositories/IGamesRepository'
import { OperationalSystem } from '../dtos/ICreateGameDTO'
import { AppError } from '@/shared/errors/AppError'

interface IRequest {
  title: string
  description: string
  short_description?: string
  genres: string[]
  operating_systems: OperationalSystem[]
  build_number: string
  version: string
  size: string
  page_url: string
  is_free: boolean
  price: number
  user_id: string
}

@injectable()
export class UpdateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  async execute(id: string, data: IRequest): Promise<void> {
    const genresExists = await this.gamesRepository.findGenresByIds(data.genres)

    const gamesExists = await this.gamesRepository.findById(id)

    if (!gamesExists) {
      throw new AppError('Game not found', 404)
    }

    if (genresExists.length !== data.genres.length) {
      throw new AppError('One or more genres not found', 400)
    }

    if (gamesExists.developer.user.id !== data.user_id) {
      throw new AppError('Game not found', 404)
    }

    await this.gamesRepository.update(id, data)
  }
}
