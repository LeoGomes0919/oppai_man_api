import { inject, injectable } from 'tsyringe'
import {
  IPurchaseResponse,
  IPurchasesRepository,
} from '../repositories/IPurchasesRepository'
import { pathFiles } from '@/utils/pathFiles'

@injectable()
export class FindAllPurchaseByUserService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  async execute(user_id: string): Promise<IPurchaseResponse[]> {
    const purchases = await this.purchasesRepository.findAllByUserId(user_id)

    const purchaseParse = purchases.map((purchase) => ({
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
    }))

    return purchaseParse
  }
}
