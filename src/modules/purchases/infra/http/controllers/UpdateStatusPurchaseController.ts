import { PurchaseStatus } from '@/modules/purchases/dtos/ICreatePurchaseDTO'
import { UpdateStatusPurchaseService } from '@/modules/purchases/services/UpdateStatusPurchaseService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export class UpdateStatusPurchaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      status: z.nativeEnum(PurchaseStatus),
    })
    const { id } = req.params
    const { id: user_id } = req.account
    const { status } = registerBodySchema.parse(req.body)

    try {
      const updateStatusPurchaseService = container.resolve(
        UpdateStatusPurchaseService,
      )

      await updateStatusPurchaseService.execute(id, {
        status,
        user_id,
      })

      return res.status(200).json({
        success: true,
        message: 'Purchase status updated successfully',
      })
    } catch (err) {
      throw err
    }
  }
}
