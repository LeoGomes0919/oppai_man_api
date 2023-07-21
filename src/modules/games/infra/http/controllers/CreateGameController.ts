import { OperationalSystem } from '@/modules/games/dtos/ICreateGameDTO'
import { CreateGameService } from '@/modules/games/services/CreateGameService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export class CreateGameController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      title: z.string().nonempty('Title is required'),
      description: z.string().nonempty('Description is required'),
      short_description: z.string().optional(),
      genres: z.array(z.string()).nonempty('Genres is required'),
      operating_systems: z
        .array(z.nativeEnum(OperationalSystem))
        .nonempty('Operating systems is required'),
      build_number: z.string().nonempty('Build number is required'),
      version: z.string().nonempty('Version is required'),
      is_free: z.boolean().default(false),
      price: z.number().min(0.0).default(0.0),
      page_url: z.string().optional(),
    })

    const data = registerBodySchema.parse(req.body)

    const dataAssingValue = Object.assign(data, {
      developer_id: req.account.id,
      size: '1GB',
    })

    try {
      const createGameService = container.resolve(CreateGameService)
      const game = await createGameService.execute(dataAssingValue)

      return res.status(201).json({
        success: true,
        message: 'Game created successfully',
        data: {
          id: game.id,
        },
      })
    } catch (err) {
      throw err
    }
  }
}
