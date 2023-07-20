/* eslint-disable prettier/prettier */
import { pathFiles } from '@/utils/pathFiles'
import { IGameResponse } from '../repositories/IGamesRepository'


export class GameMap {
  static toDTO({
    thumbnail_url,
    header_image_url,
    game_screenshot_file,
    ...rest
  }: IGameResponse): IGameResponse {
    const game = {
      thumbnail_url: thumbnail_url
        ? pathFiles('thumbnail', thumbnail_url)
        : '',
      header_image_url: header_image_url
        ? pathFiles('header_image', header_image_url)
        : '',
      game_screenshot_file: game_screenshot_file
        ? game_screenshot_file.map((file) => ({
          file_url:
            pathFiles('screenshot', file.file_url) ?? '',
        }))
        : [],
      ...rest,
    }
    delete game.developer_id
    delete game.developer.id
    delete game.developer.user


    return game
  }
}

