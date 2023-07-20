import { inject, injectable } from 'tsyringe'
import queryString from 'query-string'
import {
  IGameResponseFilter,
  IGamesRepository,
} from '../repositories/IGamesRepository'
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { GameMap } from '../mapper/GameMap'

interface IRequest {
  title?: string
  genres?: string[]
  range_days?: number
  price_min?: number
  price_max?: number
  is_free?: string
  skip?: number
  take?: number
}

@injectable()
export class FindAllWithFilterService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(filters: IRequest): Promise<IGameResponseFilter> {
    const filterParseString = queryString.stringify(filters)
    const filterParsed = queryString.parse(filterParseString, {
      parseNumbers: true,
    }) as IRequest

    if (filterParsed.range_days) {
      const date = this.dateProvider.subtractDays(filterParsed.range_days)
      Object.assign(filters, {
        start_date: date.startOf,
        end_date: date.endOf,
      })
    }

    if (filterParsed.genres) {
      filterParsed.genres = JSON.stringify(filterParsed.genres)
        .replace(/['"]/g, '')
        .replace(/[[\]]+/g, '')
        .replace(/[/\\/]/g, '')
        .split(/\s*,\s*/)
    }

    delete filterParsed.range_days
    const games = await this.gamesRepository.findAllWithFilters(filterParsed)

    const gameToDTO = games.data?.map((game) => GameMap.toDTO(game))

    return {
      meta: games.meta,
      data: gameToDTO,
    }
  }
}
