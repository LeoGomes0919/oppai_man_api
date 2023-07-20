import { Request, Response } from 'express'
import { z } from 'zod'
import { OperationalSystem } from '@/modules/games/dtos/IUpdateGameDTO'
import { container } from 'tsyringe'
import { UpdateGameService } from '@/modules/games/services/UpdateGameService'

export class UpdateGameController {
  async handle(req: Request, res: Response): Promise<Response> {
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
      page_url: z.string().nonempty('Page url is required'),
    })

    const data = registerBodySchema.parse(req.body)

    const dataAssingValue = Object.assign(data, {
      size: '1GB',
      user_id: req.account.id,
    })

    try {
      const updateGameService = container.resolve(UpdateGameService)
      await updateGameService.execute(req.params.id, dataAssingValue)

      return res.status(200).json({
        success: true,
        message: 'Game updated successfully',
      })
    } catch (err) {
      throw err
    }
  }
}
