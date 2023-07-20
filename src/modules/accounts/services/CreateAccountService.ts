import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { AppError } from '@/shared/errors/AppError'
import { Role } from '../dtos/ICreateAccountDTO'
import {
  IAccountResponse,
  IAccountsRepository,
} from '../repositories/IAccountsRepository'

interface IRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: Role
}

@injectable()
export class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    password_confirmation,
    role,
  }: IRequest): Promise<IAccountResponse> {
    const accountEmailAlreadyExists = await this.accountsRepository.findByEmail(
      email,
    )

    if (accountEmailAlreadyExists) {
      throw new AppError('Account already exists', 409)
    }

    if (password !== password_confirmation) {
      throw new AppError('Passwords do not match', 400)
    }

    const hashedPassword = await hash(password, 6)

    const account = await this.accountsRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return account
  }
}
