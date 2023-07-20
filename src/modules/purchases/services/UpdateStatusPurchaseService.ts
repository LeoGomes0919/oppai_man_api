import { inject, injectable } from 'tsyringe'
import { PurchaseStatus } from '../dtos/ICreatePurchaseDTO'
import { IPurchasesRepository } from '../repositories/IPurchasesRepository'
import { AppError } from '@/shared/errors/AppError'

interface IRequest {
  status: PurchaseStatus
  user_id: string
}

@injectable()
export class UpdateStatusPurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  async execute(id: string, data: IRequest): Promise<void> {
    const purchase = await this.purchasesRepository.findById(id)

    if (!purchase) {
      throw new AppError('Purchase not found', 404)
    }

    if (purchase.user_id !== data.user_id) {
      throw new AppError('Purchase not found', 404)
    }

    await this.purchasesRepository.updateStatus(id, data.status)
  }
}
