import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { env } from '@/shared/env'
import { AppError } from '@/shared/errors/AppError'
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { IAccountsRepository } from '../repositories/IAccountsRepository'
import { IAccountsSessionRepository } from '../repositories/IAccountsSessionRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: {
    name: string | undefined
    email: string
    role: string
  }
  refresh_token: string
}

@injectable()
export class CreateAccountSessionService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
    @inject('AccountsSessionRepository')
    private accountsSessionRepository: IAccountsSessionRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const account = await this.accountRepository.findByEmail(email)

    if (!account) {
      throw new AppError('Email or password incorrect', 401)
    }

    const passwordMatch = await compare(password, account.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401)
    }

    const token = sign(
      {
        role: account.role,
      },
      env.JWT_SECRET,
      {
        subject: account.id,
        expiresIn: env.JWT_EXPIRES_IN,
      },
    )

    const refresh_token = sign(
      { role: account.role },
      env.JWT_SECRET_REFRESH_TOKEN,
      {
        subject: account.id,
        expiresIn: env.JWT_EXPIRES_IN_REFRESH_TOKEN,
      },
    )

    const refresh_token_expires_date = this.dateProvider.addDays(
      +env.JWT_EXPIRES_IN_REFRESH_TOKEN.replace(/[^0-9]/g, ''),
    )

    await this.accountsSessionRepository.create({
      user_id: account.id,
      refresh_token,
      expires_at: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: account.developer?.name || account.customer?.name,
        email: account.email,
        role: account.role,
      },
      refresh_token,
    }

    return tokenReturn
  }
}
