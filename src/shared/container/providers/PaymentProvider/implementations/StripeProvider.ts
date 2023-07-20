import Stripe from 'stripe'
import { IPaymentProvider, IProduct } from '../IPaymentProvider'
import { env } from '@/shared/env'

export class StripeProvider implements IPaymentProvider {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(env.PAYMENT_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
  }

  async createPayment(product: IProduct): Promise<any> {
    const { id, amount, thumbnail, title } = product
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: title,
                images: [thumbnail],
                metadata: {
                  productId: id,
                },
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      })

      return {
        sessionId: session.id,
        url: session.url,
      }
    } catch (err) {
      throw err
    }
  }
}
