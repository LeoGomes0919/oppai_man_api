import 'dotenv/config'
import { z } from 'zod'
import { AppError } from '../errors/AppError'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  JWT_SECRET_REFRESH_TOKEN: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_EXPIRES_IN_REFRESH_TOKEN: z.string().default('30d'),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_DEFAULT_REGION: z.string(),
  DISK_STORAGE: z.enum(['local', 's3']).default('local'),
  AWS_BUCKET_URL: z.string(),
  APP_API_URL: z.string(),
  PAYMENT_SECRET_KEY: z.string(),
  PAYMENT_PROVIDER: z.enum(['stripe']).default('stripe'),
  WEBHOOK_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())
  throw new AppError('Invalid environment variables', 500)
}

export const env = _env.data
