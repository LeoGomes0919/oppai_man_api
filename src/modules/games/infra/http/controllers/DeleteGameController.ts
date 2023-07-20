import { DeleteGameServie } from '@/modules/games/services/DeleteGameService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteGameController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const deleteGameService = container.resolve(DeleteGameServie)

      await deleteGameService.execute(id)

      return res.status(200).json({
        success: true,
        message: 'Game deleted successfully',
      })
    } catch (err) {
      throw err
    }
  }
}
