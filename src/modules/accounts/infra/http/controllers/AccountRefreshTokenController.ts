import { AccountRefreshTokenService } from '@/modules/accounts/services/AccountRefreshTokenService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class AccountRefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers['x-access-token'] || req.query.token

    const accountRefreshTokenService = container.resolve(
      AccountRefreshTokenService,
    )

    const refreshToken = await accountRefreshTokenService.execute(token)

    return res.json(refreshToken)
  }
}
