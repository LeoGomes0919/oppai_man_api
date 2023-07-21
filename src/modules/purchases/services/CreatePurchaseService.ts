import { inject, injectable } from 'tsyringe'
import {
  IPurchaseResponse,
  IPurchasesRepository,
} from '../repositories/IPurchasesRepository'
import { IGamesRepository } from '@/modules/games/repositories/IGamesRepository'
import { AppError } from '@/shared/errors/AppError'
import { PaymentMethod, PurchaseStatus } from '../dtos/ICreatePurchaseDTO'
import { IPaymentProvider } from '@/shared/container/providers/PaymentProvider/IPaymentProvider'
import { pathFiles } from '@/utils/pathFiles'
import { env } from '@/shared/env'

interface IRequest {
  user_id: string
  payment_method: PaymentMethod
  products: {
    game_id: string
    quantity: number
  }
}

interface IResponse {
  purchase: IPurchaseResponse
  payment?: {
    url: string
  }
}

@injectable()
export class CreatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider,
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const game = await this.gamesRepository.findById(data.products.game_id)

    if (!game) {
      throw new AppError('Game unavailable', 400)
    }

    const dataAssingValue = Object.assign(data, {
      status: PurchaseStatus.awaiting_payment,
      total: game.price * data.products.quantity,
      products: {
        game_id: data.products.game_id,
        price: game.price,
        quantity: data.products.quantity,
        is_free: game.is_free,
        total: game.price * data.products.quantity,
      },
    })

    const purchase = await this.purchasesRepository.create(dataAssingValue)

    if (!purchase) {
      throw new AppError('Purchase not created', 400)
    }

    const dataResult = {
      purchase: {
        ...purchase,
        order_item: purchase.order_item.map((item) => ({
          ...item,
          game: {
            ...item.game,
            thumbnail_url: item.game.thumbnail_url
              ? pathFiles('thumbnail', item.game.thumbnail_url)
              : '',
          },
        })),
      },
    }

    if (!game.is_free || env.PAYMENT_PROVIDER !== 'local') {
      const product = {
        id: game.id,
        amount: game.price,
        thumbnail: game.thumbnail_url
          ? pathFiles('thumbnail', game.thumbnail_url)
          : '',
        title: game.title,
      }
      const payment = await this.paymentProvider.createPayment(product)

      Object.assign(dataResult, {
        payment: {
          url: payment.url,
        },
      })
    }

    return dataResult
  }
}
