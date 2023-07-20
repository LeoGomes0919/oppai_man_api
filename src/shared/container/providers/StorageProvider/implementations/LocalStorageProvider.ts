import fs from 'fs'
import { resolve } from 'path'

import { IStorageProvider } from '../IStorageProvider'
import upload from '@/config/upload'
import { AppError } from '@/shared/errors/AppError'

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    const filePath = resolve(upload.tmpFolder, file)

    if (!fs.existsSync(filePath)) {
      throw new AppError('Error saving file directory not found', 500)
    }

    if (!fs.existsSync(resolve(upload.tmpFolder, folder))) {
      await fs.promises.mkdir(resolve(upload.tmpFolder, folder))
    }

    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    )

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)

    if (!fs.existsSync(filename)) {
      throw new AppError('Error deleting file directory not found', 500)
    }

    try {
      await fs.promises.stat(filename)
    } catch (err) {
      throw err
    }

    await fs.promises.unlink(filename)
  }
}
