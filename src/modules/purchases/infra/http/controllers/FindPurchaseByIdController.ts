import { FindPurchaseByIdService } from '@/modules/purchases/services/FindPurchaseByIdService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindPurchaseByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { id: user_id } = req.account

    try {
      const findPurchaseByIdService = container.resolve(FindPurchaseByIdService)
      const purchase = await findPurchaseByIdService.execute(id, user_id)

      return res.status(200).json({
        success: true,
        message: 'Purchase found successfully',
        data: purchase,
      })
    } catch (err) {
      throw err
    }
  }
}
