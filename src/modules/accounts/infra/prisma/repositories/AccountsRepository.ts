import { prisma } from '@/shared/infra/prisma'
import { Role } from '@prisma/client'
import { ICreateAccountDTO } from '@/modules/accounts/dtos/ICreateAccountDTO'
import {
  IAccountResponse,
  IAccountsRepository,
} from '@/modules/accounts/repositories/IAccountsRepository'

export class AccountsRepository implements IAccountsRepository {
  async create({
    name,
    email,
    password,
    role,
  }: ICreateAccountDTO): Promise<IAccountResponse> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
        ...(role === Role.DEVELOPER
          ? { developer: { create: { name } } }
          : { customer: { create: { name } } }),
      },
      include: {
        developer: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<IAccountResponse | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        developer: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return user
  }

  async findById(id: string): Promise<IAccountResponse | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        developer: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return user
  }
}
