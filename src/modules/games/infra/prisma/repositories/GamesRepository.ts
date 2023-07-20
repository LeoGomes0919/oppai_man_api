import { prisma } from '@/shared/infra/prisma'
import { ICreateGameDTO } from '@/modules/games/dtos/ICreateGameDTO'
import { IUpdateGameDTO } from '@/modules/games/dtos/IUpdateGameDTO'
import {
  IFilterGame,
  IGameResponseFilter,
  IGameResponse,
  IGamesRepository,
  IUpdateFiles,
  IGameResponseById,
  IGameLibraryResponse,
} from '@/modules/games/repositories/IGamesRepository'

export class GamesRepository implements IGamesRepository {
  async findAllByDeveloperId(
    developer_id: string,
  ): Promise<IGameLibraryResponse[]> {
    const games = await prisma.game.findMany({
      select: {
        id: true,
        title: true,
        thumbnail_url: true,
        price: true,
        is_free: true,
        page_url: true,
        created_at: true,
      },
      where: {
        developer_id,
      },
    })
    return games
  }

  async create(
    data: ICreateGameDTO,
  ): Promise<{ id: string; page_url: string }> {
    const game = await prisma.game.create({
      data: {
        title: data.title,
        description: data.description,
        short_description: data.short_description,
        developer: {
          connect: {
            id: data.developer_id,
          },
        },
        thumbnail_url: data.thumbnail_url,
        header_image_url: data.header_image_url,
        page_url: data.page_url,
        is_free: data.is_free,
        price: data.price,
        game_genre: {
          create: data.genres.map((genre) => ({
            genre: {
              connect: {
                id: genre,
              },
            },
          })),
        },
        game_operating_system: {
          create: data.operating_systems.map((system) => ({
            operating_system: system,
          })),
        },
        game_build: {
          create: {
            build_number: data.build_number,
            version: data.version,
            is_active: true,
            size: data.size,
          },
        },
      },
    })

    return {
      id: game.id,
      page_url: game.page_url,
    }
  }

  async update(id: string, data: IUpdateGameDTO): Promise<void> {
    await prisma.game.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        short_description: data.short_description,
        thumbnail_url: data.thumbnail_url,
        header_image_url: data.header_image_url,
        page_url: data.page_url,
        is_free: data.is_free,
        price: data.price,
        game_genre: {
          deleteMany: {},
          create: data.genres.map((genre) => ({
            genre: {
              connect: {
                id: genre,
              },
            },
          })),
        },
        game_operating_system: {
          deleteMany: {},
          create: data.operating_systems.map((system) => ({
            operating_system: system,
          })),
        },
        game_build: {
          updateMany: {
            where: {
              game_id: id,
            },
            data: {
              is_active: false,
              deleted_at: new Date(),
            },
          },
          create: {
            build_number: data.build_number,
            version: data.version,
            is_active: true,
            size: data.size,
          },
        },
      },
    })
  }

  async updateFiles(id: string, data: IUpdateFiles): Promise<void> {
    await prisma.game.update({
      where: {
        id,
      },
      data: {
        thumbnail_url: data.thumbnail_url,
        header_image_url: data.header_image_url,
        game_screenshot_file: {
          create:
            data.screenshots?.map((screenshot) => ({
              file_url: screenshot,
            })) ?? [],
        },
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.game.delete({
      where: {
        id,
      },
    })
  }

  async showById(id: string): Promise<IGameResponse | null> {
    const game = await prisma.game.findUnique({
      where: {
        id,
        deleted_at: null,
      },
      include: {
        developer: {
          select: {
            id: true,
            name: true,
            user: {
              select: {
                email: true,
                id: true,
              },
            },
          },
        },
        game_genre: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        game_operating_system: {
          select: {
            operating_system: true,
          },
        },
        game_build: {
          select: {
            build_number: true,
            version: true,
            size: true,
            is_active: true,
          },
          where: {
            is_active: true,
          },
        },
        game_screenshot_file: {
          select: {
            file_url: true,
          },
        },
      },
    })

    return game
  }

  async findById(id: string): Promise<IGameResponseById | null> {
    const game = await prisma.game.findUnique({
      select: {
        id: true,
        title: true,
        price: true,
        is_free: true,
        thumbnail_url: true,
        header_image_url: true,
        game_screenshot_file: true,
        developer: {
          select: {
            id: true,
            name: true,
            user: {
              select: {
                email: true,
                id: true,
              },
            },
          },
        },
      },
      where: {
        id,
        deleted_at: null,
      },
    })

    return game
  }

  async findGenresByIds(genres: string[]): Promise<string[]> {
    const genresExists = await prisma.genre.findMany({
      where: {
        id: {
          in: genres,
        },
      },
    })

    return genresExists.map((genre) => genre.id)
  }

  async findAllWithFilters(filters: IFilterGame): Promise<IGameResponseFilter> {
    const skip = filters.skip ?? 0
    const take = filters.take ?? 10
    const filter = this.createFilter(filters)

    const [games, total] = await prisma.$transaction([
      prisma.game.findMany({
        where: {
          ...filter,
        },
        include: {
          developer: {
            select: {
              id: true,
              name: true,
              user: {
                select: {
                  email: true,
                  id: true,
                },
              },
            },
          },
          game_genre: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
          game_operating_system: {
            select: {
              operating_system: true,
            },
          },
          game_build: {
            select: {
              build_number: true,
              version: true,
              size: true,
              is_active: true,
            },
            where: {
              is_active: true,
            },
          },
          game_screenshot_file: {
            select: {
              file_url: true,
            },
          },
        },
        skip,
        take,
      }),
      prisma.game.count({
        where: {
          ...filter,
        },
      }),
    ])

    return {
      data: games as IGameResponse[],
      meta: {
        total,
        total_pages: Math.ceil(total / take) || 0,
        page: Math.ceil(skip / take) + 1 || 0,
        per_page: take || 0,
      },
    }
  }

  createFilter(filters: IFilterGame): any {
    const {
      title,
      genres,
      start_date,
      end_date,
      price_min,
      price_max,
      is_free,
    } = filters

    const query = {
      deleted_at: null,
      AND: [],
    } as any

    if (title) {
      query.AND.push({
        title: {
          contains: title,
        },
      })
    }

    if (is_free === 'true') {
      query.AND.push({
        is_free: true,
      })
    }
    if (is_free === 'false') {
      query.AND.push({
        is_free: false,
      })
    }

    if (genres && genres.length > 0) {
      query.AND.push({
        game_genre: {
          some: {
            genre_id: {
              in: genres,
            },
          },
        },
      })
    }

    if (start_date && end_date) {
      query.AND.push({
        created_at: {
          gte: start_date,
          lte: end_date,
        },
      })
    }

    if (price_min && price_max) {
      query.AND.push({
        price: {
          gte: price_min,
          lte: price_max,
        },
      })
    }

    if (price_min && !price_max) {
      query.AND.push({
        price: {
          gte: price_min,
        },
      })
    }

    if (!price_min && price_max) {
      query.AND.push({
        price: {
          lte: price_max,
        },
      })
    }

    return query
  }
}
