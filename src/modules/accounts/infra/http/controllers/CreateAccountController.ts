import { Role } from '@/modules/accounts/dtos/ICreateAccountDTO'
import { CreateAccountService } from '@/modules/accounts/services/CreateAccountService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export class CreateAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        password_confirmation: z.string().min(8),
        role: z.nativeEnum(Role),
      })
      .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['password_confirmation'],
      })

    const { name, email, password, password_confirmation, role } =
      registerBodySchema.parse(req.body)

    try {
      const createAccountService = container.resolve(CreateAccountService)
      await createAccountService.execute({
        name,
        email,
        password,
        password_confirmation,
        role,
      })

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
      })
    } catch (err) {
      throw err
    }
  }
}
