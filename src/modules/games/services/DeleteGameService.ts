import { inject, injectable } from 'tsyringe'
import { IGamesRepository } from '../repositories/IGamesRepository'
import { AppError } from '@/shared/errors/AppError'
import { IAccountsRepository } from '@/modules/accounts/repositories/IAccountsRepository'

@injectable()
export class DeleteGameServie {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const game = await this.gamesRepository.findById(id)

    if (!game) {
      throw new AppError('Game not found', 404)
    }
    const account = await this.accountsRepository.findById(
      game.developer.user.id,
    )

    if (account?.developer?.id !== game.developer.id) {
      throw new AppError('Game not found', 404)
    }

    await this.gamesRepository.delete(id)
  }
}
