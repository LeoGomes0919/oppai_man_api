import { FindAllPurchaseByUserService } from '@/modules/purchases/services/FindAllPurchaseByUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindAllPurchaseByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.account
    const { page, limit } = req.query as { page: string; limit: string }

    try {
      const findAllByUser = container.resolve(FindAllPurchaseByUserService)

      const purchases = await findAllByUser.execute(user_id, page, limit)

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
