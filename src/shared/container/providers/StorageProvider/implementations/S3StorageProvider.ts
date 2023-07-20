import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { resolve } from 'path'
import fs from 'fs'
import mime from 'mime'
import { IStorageProvider } from '../IStorageProvider'
import { env } from '@/shared/env'
import upload from '@/config/upload'

export class S3StorageProvider implements IStorageProvider {
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      region: env.AWS_DEFAULT_REGION,
    })
  }

  async save(file: string, folder: string): Promise<string> {
    try {
      const originalPath = resolve(upload.tmpFolder, file)

      const fileContent = await fs.promises.readFile(originalPath)

      const ContentType = mime.getType(originalPath) || undefined

      await this.client.send(
        new PutObjectCommand({
          Bucket: env.AWS_BUCKET_NAME,
          Key: `${folder}/${file}`,
          ACL: 'public-read',
          Body: fileContent,
          ContentType,
        }),
      )

      await fs.promises.unlink(originalPath)

      return file
    } catch (err) {
      throw err
    }
  }

  async delete(file: string, folder: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: env.AWS_BUCKET_NAME,
          Key: `${folder}/${file}`,
        }),
      )
    } catch (err) {
      throw err
    }
  }
}
