import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { env } from '@/shared/env'
import { AppError } from '@/shared/errors/AppError'
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { IAccountsSessionRepository } from '../repositories/IAccountsSessionRepository'

interface IPayload {
  sub: string
  role: string
}
interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
export class AccountRefreshTokenService {
  constructor(
    @inject('AccountsSessionRepository')
    private accountsSessionRepository: IAccountsSessionRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub: user_id, role } = verify(
      token,
      env.JWT_SECRET_REFRESH_TOKEN,
    ) as IPayload

    const accountSession =
      await this.accountsSessionRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token: token,
      })

    if (!accountSession) {
      throw new AppError('Refresh token does not exists!', 400)
    }

    await this.accountsSessionRepository.delete(accountSession.id)

    const expiere_date = this.dateProvider.addDays(
      +env.JWT_EXPIRES_IN_REFRESH_TOKEN.replace(/[^0-9]/g, ''),
    )

    const refresh_token = sign({ role }, env.JWT_SECRET_REFRESH_TOKEN, {
      subject: user_id,
      expiresIn: env.JWT_EXPIRES_IN_REFRESH_TOKEN,
    })

    await this.accountsSessionRepository.create({
      user_id,
      refresh_token,
      expires_at: expiere_date,
    })

    const newToken = sign(
      {
        role,
      },
      env.JWT_SECRET,
      {
        subject: user_id,
        expiresIn: env.JWT_EXPIRES_IN,
      },
    )

    return {
      token: newToken,
      refresh_token,
    }
  }
}
