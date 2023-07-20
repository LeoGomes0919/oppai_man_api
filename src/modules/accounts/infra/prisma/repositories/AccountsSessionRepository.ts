import { ICreateAccountSessionDTO } from '@/modules/accounts/dtos/ICreateAccountSessionDTO'
import {
  IAccountsSessionRepository,
  IAccountSessionResponse,
  IRequest,
} from '@/modules/accounts/repositories/IAccountsSessionRepository'
import { prisma } from '@/shared/infra/prisma'

export class AccountsSessionRepository implements IAccountsSessionRepository {
  async create({
    user_id,
    refresh_token,
    expires_at,
  }: ICreateAccountSessionDTO): Promise<IAccountSessionResponse> {
    const session = prisma.userSession.create({
      data: {
        user_id,
        refresh_token,
        expires_at,
      },
    })

    return session
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IRequest): Promise<IAccountSessionResponse | null> {
    const session = await prisma.userSession.findFirst({
      where: {
        user_id,
        refresh_token,
        deleted_at: null,
      },
    })

    return session
  }

  async delete(id: string): Promise<void> {
    await prisma.userSession.delete({
      where: {
        id,
      },
    })
  }
}
