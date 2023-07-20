import { env } from '@/shared/env'

export const pathFiles = (folder: string, file: string): string => {
  if (env.DISK_STORAGE === 'local') {
    return `${env.APP_API_URL}/${folder}/${file}`
  }

  return `${env.AWS_BUCKET_URL}/${folder}/${file}`
}
