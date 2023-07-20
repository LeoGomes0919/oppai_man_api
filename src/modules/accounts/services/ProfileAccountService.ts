import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../repositories/IAccountsRepository'
import { IAccountResponseDTO } from '../dtos/IAccountResponseDTO'
import { AccountMap } from '../mapper/AccountMap'
import { AppError } from '@/shared/errors/AppError'

@injectable()
export class ProfileAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute(id: string): Promise<IAccountResponseDTO> {
    const account = await this.accountsRepository.findById(id)

    if (!account) {
      throw new AppError('Account not found', 404)
    }

    return AccountMap.toDTO(account)
  }
}
