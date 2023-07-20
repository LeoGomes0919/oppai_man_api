import { inject, injectable } from 'tsyringe'
import {
  IPurchaseResponse,
  IPurchasesRepository,
} from '../repositories/IPurchasesRepository'
import { AppError } from '@/shared/errors/AppError'
import { pathFiles } from '@/utils/pathFiles'

@injectable()
export class FindPurchaseByIdService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  async execute(
    id: string,
    user_id: string,
  ): Promise<IPurchaseResponse | null> {
    const purchase = await this.purchasesRepository.findById(id)

    if (!purchase) {
      throw new AppError('Purchase not found', 404)
    }

    if (purchase.user_id !== user_id) {
      throw new AppError('Purchase not found', 404)
    }

    const purchaseParse = {
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
    }

    return purchaseParse
  }
}
