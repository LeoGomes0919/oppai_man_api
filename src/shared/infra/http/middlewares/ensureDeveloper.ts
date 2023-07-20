import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/shared/errors/AppError'
import { Role } from '@/modules/accounts/dtos/ICreateAccountDTO'

export async function ensureDeveloper(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { role } = req.account

  if (role !== Role.developer) {
    throw new AppError('Access denied', 401)
  }

  return next()
}
