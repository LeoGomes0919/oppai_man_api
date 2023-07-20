import { AccountsRepository } from '@/modules/accounts/infra/prisma/repositories/AccountsRepository'
import { env } from '@/shared/env'
import { AppError } from '@/shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers

  if (!authorization) {
    throw new AppError('Token is missing', 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub: user_id } = verify(token, env.JWT_SECRET) as IPayload
    const accountsRepository = new AccountsRepository()

    const account = await accountsRepository.findById(user_id)

    if (!account) {
      throw new AppError('Account does not exists', 401)
    }

    req.account = {
      id: account.id,
      role: account.role,
    }

    next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}
