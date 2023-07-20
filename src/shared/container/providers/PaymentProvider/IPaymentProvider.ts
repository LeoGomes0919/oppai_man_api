export interface IProduct {
  id: string
  amount: number
  thumbnail: string
  title: string
}

export interface IPaymentProvider {
  createPayment(product: IProduct): Promise<any>
}
