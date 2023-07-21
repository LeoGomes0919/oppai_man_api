/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import 'express-async-errors'
import '../../container'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from '@/swagger.json'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { routes } from './routes'
import { AppError } from '@/shared/errors/AppError'

const app = express()
app.use(cors())

app.use(express.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

app.use(express.static('tmp'))

app.use('/api', routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      issues: err.format(),
    })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: `Internal server error - ${err.message}`,
  })
})

export { app }
