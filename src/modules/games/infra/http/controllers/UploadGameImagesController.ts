import { UploadGameImagesService } from '@/modules/games/services/UploadGameImagesService'
import { AppError } from '@/shared/errors/AppError'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UploadGameImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const files = req.files as any

    try {
      if (Object.values(files).length === 0) {
        throw new AppError('No files were sent')
      }

      const data = {
        thumbnail: (files.thumbnail?.[0].filename as string) ?? null,
        header_image: (files.header_image?.[0].filename as string) ?? null,
        screenshots:
          (files.screenshots?.map(
            (screenshot: any) => screenshot.filename,
          ) as string[]) ?? [],
      }

      const uploadGameImagesService = container.resolve(UploadGameImagesService)

      await uploadGameImagesService.execute(id, data)

      return res.status(200).json({
        success: true,
        message: 'Images uploaded successfully',
      })
    } catch (err) {
      throw err
    }
  }
}
