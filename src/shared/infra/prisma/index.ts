import { env } from '@/shared/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
}).$extends({
  name: 'softDelete',
  query: {
    $allModels: {
      async delete({ model, args }) {
        return await (prisma as any)[model].update({
          ...args,
          data: { deleted_at: new Date() },
        })
      },
    },
  },
}) as PrismaClient
