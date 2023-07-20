import { FindAllPurchaseByUserService } from '@/modules/purchases/services/FindAllPurchaseByUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindAllPurchaseByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.account

    try {
      const findAllByUser = container.resolve(FindAllPurchaseByUserService)

      const purchases = await findAllByUser.execute(user_id)

      return res.status(200).json({
        success: true,
        messaga: 'Purchases found successfully',
        data: purchases,
      })
    } catch (err) {
      throw err
    }
  }
}
