import { ProfileAccountService } from '@/modules/accounts/services/ProfileAccountService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ProfileAccountController {
  async handle(req: Request, res: Response) {
    const { id } = req.account

    try {
      const profileAccountService = container.resolve(ProfileAccountService)

      const profileAccount = await profileAccountService.execute(id)

      return res.status(200).json({
        success: true,
        message: 'Account profile successfully listed',
        data: profileAccount,
      })
    } catch (err) {
      throw err
    }
  }
}
