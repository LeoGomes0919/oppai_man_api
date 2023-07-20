import { FindGameByIdService } from '@/modules/games/services/FindGameByIdService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindGameByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const findGameById = container.resolve(FindGameByIdService)

      const game = await findGameById.execute(id)

      return res.status(200).json({
        success: true,
        message: 'Game found successfully',
        data: game,
      })
    } catch (err) {
      throw err
    }
  }
}
