import { ICreatePurchaseDTO, PurchaseStatus } from '../dtos/ICreatePurchaseDTO'

export interface IPurchaseResponse {
  id: string
  user_id: string
  payment_method: string
  status: string
  total: number
  created_at: Date
  updated_at: Date
  order_item: {
    game_id: string
    price: number
    quantity: number
    is_free: boolean | null
    total: number
    game: {
      title: string
      thumbnail_url: string
    }
  }[]
}

export interface IPurchasesRepository {
  create(data: ICreatePurchaseDTO): Promise<IPurchaseResponse>
  findAllByUserId(user_id: string): Promise<IPurchaseResponse[]>
  updateStatus(id: string, status: PurchaseStatus): Promise<void>
  findById(id: string): Promise<IPurchaseResponse | null>
}
