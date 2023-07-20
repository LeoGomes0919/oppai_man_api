import {
  ICreatePurchaseDTO,
  PurchaseStatus,
} from '@/modules/purchases/dtos/ICreatePurchaseDTO'
import {
  IPurchaseResponse,
  IPurchasesRepository,
} from '@/modules/purchases/repositories/IPurchasesRepository'
import { prisma } from '@/shared/infra/prisma'

export class PurchasesRepository implements IPurchasesRepository {
  async findById(id: string): Promise<IPurchaseResponse | null> {
    return await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        user_id: true,
        payment_method: true,
        status: true,
        total: true,
        created_at: true,
        updated_at: true,
        order_item: {
          select: {
            game_id: true,
            price: true,
            quantity: true,
            is_free: true,
            total: true,
            game: {
              select: {
                title: true,
                thumbnail_url: true,
              },
            },
          },
        },
      },
    })
  }

  async updateStatus(id: string, status: PurchaseStatus): Promise<void> {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  }

  async findAllByUserId(user_id: string): Promise<IPurchaseResponse[]> {
    return await prisma.order.findMany({
      select: {
        id: true,
        user_id: true,
        payment_method: true,
        status: true,
        total: true,
        created_at: true,
        updated_at: true,
        order_item: {
          select: {
            game_id: true,
            price: true,
            quantity: true,
            is_free: true,
            total: true,
            game: {
              select: {
                title: true,
                thumbnail_url: true,
              },
            },
          },
        },
      },
      where: {
        user_id,
      },
    })
  }

  async create(data: ICreatePurchaseDTO): Promise<IPurchaseResponse> {
    return await prisma.order.create({
      data: {
        user_id: data.user_id,
        payment_method: data.payment_method,
        status: data.status,
        total: data.total,
        order_item: {
          create: data.products,
        },
      },
      select: {
        id: true,
        user_id: true,
        payment_method: true,
        status: true,
        total: true,
        created_at: true,
        updated_at: true,
        order_item: {
          select: {
            game_id: true,
            price: true,
            quantity: true,
            is_free: true,
            total: true,
            game: {
              select: {
                title: true,
                thumbnail_url: true,
              },
            },
          },
        },
      },
    })
  }
}
