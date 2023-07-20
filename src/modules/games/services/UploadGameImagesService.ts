import { inject, injectable } from 'tsyringe'
import { IGamesRepository } from '../repositories/IGamesRepository'
import { IStorageProvider } from '@/shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '@/shared/errors/AppError'

interface IRequest {
  thumbnail: string
  header_image: string
  screenshots: string[]
}

@injectable()
export class UploadGameImagesService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(game_id: string, files: IRequest): Promise<void> {
    const game = await this.gamesRepository.findById(game_id)

    if (!game) {
      throw new AppError('Game not found', 404)
    }

    if (files.thumbnail && game.thumbnail_url) {
      await this.storageProvider.delete(game.thumbnail_url, 'thumbnail')
    }

    if (files.header_image && game.header_image_url) {
      await this.storageProvider.delete(game.header_image_url, 'header_image')
    }

    if (files.thumbnail) {
      await this.storageProvider.save(files.thumbnail, 'thumbnail')
      game.thumbnail_url = files.thumbnail
    }

    if (files.header_image) {
      await this.storageProvider.save(files.header_image, 'header_image')
      game.header_image_url = files.header_image
    }

    if (
      files.screenshots.length > 0 &&
      game?.game_screenshot_file &&
      game?.game_screenshot_file?.length >= 5
    ) {
      game.game_screenshot_file?.forEach(async (screenshot) => {
        await this.storageProvider.delete(screenshot.file_url, 'screenshot')
      })
    }

    if (files.screenshots.length > 0) {
      const screenshots = await Promise.all(
        files.screenshots.map(async (screenshot) => {
          await this.storageProvider.save(screenshot, 'screenshot')
          return screenshot
        }),
      )

      game.game_screenshot_file = screenshots.map((screenshot) => ({
        file_url: screenshot,
      }))
    }

    if (Object.values(files).length > 0) {
      await this.gamesRepository.updateFiles(game_id, {
        thumbnail_url: game.thumbnail_url,
        header_image_url: game.header_image_url,
        screenshots: game.game_screenshot_file?.map(
          (screenshot) => screenshot.file_url,
        ) as string[] | undefined,
      })
    }
  }
}
