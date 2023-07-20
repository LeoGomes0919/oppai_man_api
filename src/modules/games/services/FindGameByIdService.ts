import { inject, injectable } from 'tsyringe'
import {
  IGameResponse,
  IGamesRepository,
} from '../repositories/IGamesRepository'
import { AppError } from '@/shared/errors/AppError'
import { GameMap } from '../mapper/GameMap'

@injectable()
export class FindGameByIdService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  async execute(id: string): Promise<IGameResponse> {
    const gamesExists = await this.gamesRepository.showById(id)

    if (!gamesExists) {
      throw new AppError('Game not found', 404)
    }

    return GameMap.toDTO(gamesExists)
  }
}
