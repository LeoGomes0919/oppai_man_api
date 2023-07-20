export enum OperationalSystem {
  WINDOWS = 'WINDOWS',
  LINUX = 'LINUX',
  MAC = 'MAC',
}

export interface IUpdateGameDTO {
  title: string
  description: string
  short_description?: string
  genres: string[]
  operating_systems: OperationalSystem[]
  build_number: string
  version: string
  size: string
  page_url: string
  is_free: boolean
  price: number
}
