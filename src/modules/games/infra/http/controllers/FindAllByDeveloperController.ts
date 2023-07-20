import { FindAllByDeveloperService } from '@/modules/games/services/FindAllByDeveloperService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindAllByDeveloperController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.account

    try {
      const findAllByDeveloper = container.resolve(FindAllByDeveloperService)

      const games = await findAllByDeveloper.execute(id)

      return res.status(200).json({
        success: true,
        messaga: 'Games found successfully',
        data: games,
      })
    } catch (err) {
      throw err
    }
  }
}
