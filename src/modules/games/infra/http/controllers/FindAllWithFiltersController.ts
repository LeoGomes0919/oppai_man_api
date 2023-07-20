import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FindAllWithFilterService } from '@/modules/games/services/FindAllWithFilterService'

export class FindAllWithFiltersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const findAllFilters = container.resolve(FindAllWithFilterService)

      const games = await findAllFilters.execute(req.query)

      return res.status(200).json({
        success: true,
        message: 'Games found successfully',
        data: games,
      })
    } catch (err) {
      throw err
    }
  }
}
