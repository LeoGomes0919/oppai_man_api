export enum PaymentMethod {
  credit_card = 'CREDIT_CARD',
}

export enum PurchaseStatus {
  awaiting_payment = 'AWAITING_PAYMENT',
  paind = 'PAID',
  canceled = 'CANCELED',
}

export interface ICreatePurchaseDTO {
  user_id: string
  payment_method: PaymentMethod
  status: PurchaseStatus
  total: number
  products: {
    game_id: string
    price: number
    quantity: number
    is_free: boolean
    total: number
  }
}
