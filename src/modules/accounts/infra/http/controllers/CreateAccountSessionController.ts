import { CreateAccountSessionService } from '@/modules/accounts/services/CreateAccountSessionService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export class CreateAccountSessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = registerBodySchema.parse(req.body)

    try {
      const createAccountSessionService = container.resolve(
        CreateAccountSessionService,
      )

      const token = await createAccountSessionService.execute({
        email,
        password,
      })

      return res.status(200).json({
        success: true,
        message: 'User authenticated successfully',
        data: token,
      })
    } catch (err) {
      throw err
    }
  }
}
