import { IAccountType } from '../repositories/IAccountsRepository'

export interface IAccountResponseDTO {
  id: string
  email: string
  developer: IAccountType | null
  customer?: IAccountType | null
}
