import { ICreateGameDTO } from '../dtos/ICreateGameDTO'
import { IUpdateGameDTO } from '../dtos/IUpdateGameDTO'

interface IGameGenre {
  genre: {
    name: string
  }
}

interface IGameOperatingSystem {
  operating_system: string
}

interface IGameBuild {
  build_number: string
  version: string
  is_active: boolean
  size: string
}

export interface IGameScreenshotFile {
  file_url: string
}

export interface IGameResponse {
  id: string
  title: string
  description: string
  short_description: string | null
  developer_id?: string
  thumbnail_url: string | null
  header_image_url: string | null
  page_url?: string | null
  is_free: boolean
  price: number
  created_at: Date
  updated_at: Date
  developer: {
    id?: string
    name: string
    user?: {
      id: string
      email: string
    }
  }
  game_genre: IGameGenre[] | null
  game_build: IGameBuild[] | null
  game_screenshot_file: IGameScreenshotFile[] | null
  game_operating_system: IGameOperatingSystem[] | null
}

export interface IGameLibraryResponse {
  id: string
  title: string
  thumbnail_url: string | null
  price: number
  page_url?: string | null
  is_free: boolean | null
  created_at: Date
}

export interface IGameResponseById {
  id: string
  title: string
  price: number
  thumbnail_url: string | null
  header_image_url: string | null
  is_free: boolean
  developer: {
    id: string
    name: string
    user: {
      id: string
      email: string
    }
  }
  game_screenshot_file: IGameScreenshotFile[] | null
}

export interface IFilterGame {
  title?: string
  genres?: string[] | string
  start_date?: Date
  end_date?: Date
  price_min?: number
  price_max?: number
  is_free?: string
  skip?: number
  take?: number
}

export interface IUpdateFiles {
  thumbnail_url: string | null
  header_image_url: string | null
  screenshots: string[] | undefined
}

export interface IGameResponseFilter {
  data: IGameResponse[]
  meta: {
    total: number
    total_pages: number
    page: number
    per_page: number
  }
}

export interface IUserTypeLibrary {
  id: string
  developer: {
    id: string
  }
}

export interface IGamesRepository {
  create(data: ICreateGameDTO): Promise<{ id: string }>
  update(id: string, data: IUpdateGameDTO): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<IGameResponseById | null>
  showById(id: string): Promise<IGameResponse | null>
  findGenresByIds(genres: string[]): Promise<string[]>
  findAllWithFilters(filters: IFilterGame): Promise<IGameResponseFilter>
  updateFiles(id: string, data: IUpdateFiles): Promise<void>
  findAllByDeveloperId(developer_id: string): Promise<IGameLibraryResponse[]>
}
