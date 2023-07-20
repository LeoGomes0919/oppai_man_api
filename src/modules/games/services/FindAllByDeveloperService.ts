import { inject, injectable } from 'tsyringe'
import {
  IGameLibraryResponse,
  IGamesRepository,
} from '../repositories/IGamesRepository'
import { IAccountsRepository } from '@/modules/accounts/repositories/IAccountsRepository'
import { AppError } from '@/shared/errors/AppError'
import { pathFiles } from '@/utils/pathFiles'

@injectable()
export class FindAllByDeveloperService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute(id: string): Promise<IGameLibraryResponse[]> {
    const account = await this.accountsRepository.findById(id)

    if (!account?.developer) {
      throw new AppError('Account not found', 404)
    }

    const games = await this.gamesRepository.findAllByDeveloperId(
      account.developer.id,
    )

    const gamesParse = games.map((game) => ({
      ...game,
      thumbnail_url: game.thumbnail_url
        ? pathFiles('thumbnail', game.thumbnail_url)
        : '',
    }))

    return gamesParse
  }
}
