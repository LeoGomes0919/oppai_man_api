import { inject, injectable } from 'tsyringe'
import {
  IPurchaseResponse,
  IPurchasesRepository,
} from '../repositories/IPurchasesRepository'
import { pathFiles } from '@/utils/pathFiles'

interface IResponse {
  data: IPurchaseResponse[]
  meta: {
    total: number
    total_pages: number
    page: number
    per_page: number
  }
}
@injectable()
export class FindAllPurchaseByUserService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  async execute(
    user_id: string,
    page: string,
    limit: string,
  ): Promise<IResponse> {
    const purchases = await this.purchasesRepository.findAllByUserId(
      user_id,
      page,
      limit,
    )

    const purchaseParse = purchases.data.map((purchase) => ({
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

    return {
      data: purchaseParse,
      meta: purchases.meta,
    }
  }
}
