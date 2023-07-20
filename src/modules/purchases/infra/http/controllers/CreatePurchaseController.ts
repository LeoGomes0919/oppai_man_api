import { PaymentMethod } from '@/modules/purchases/dtos/ICreatePurchaseDTO'
import { CreatePurchaseService } from '@/modules/purchases/services/CreatePurchaseService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export class CreatePurchaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      payment_method: z.nativeEnum(PaymentMethod),
      products: z.object({
        game_id: z.string(),
        quantity: z.number(),
      }),
    })

    const { payment_method, products } = registerBodySchema.parse(req.body)

    try {
      const createPurchase = container.resolve(CreatePurchaseService)

      const purchase = await createPurchase.execute({
        user_id: req.account.id,
        payment_method,
        products,
      })

      return res.status(200).json({
        success: true,
        message: 'Purchase created successfully',
        data: purchase,
      })
    } catch (err) {
      throw err
    }
  }
}
