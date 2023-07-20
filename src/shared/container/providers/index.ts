import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { env } from '@/shared/env'
import { IPaymentProvider } from './PaymentProvider/IPaymentProvider'
import { StripeProvider } from './PaymentProvider/implementations/StripeProvider'

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

const paymentGateway = {
  stripe: StripeProvider,
}

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[env.DISK_STORAGE],
)

container.registerSingleton<IPaymentProvider>(
  'PaymentProvider',
  paymentGateway[env.PAYMENT_PROVIDER],
)
