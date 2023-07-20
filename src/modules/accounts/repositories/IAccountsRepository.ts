import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO'

export interface IAccountType {
  id: string
  name: string
}

export interface IAccountResponse {
  id: string
  email: string
  password: string
  role: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  developer: IAccountType | null
  customer: IAccountType | null
}

export interface IAccountsRepository {
  create({
    email,
    password,
    role,
  }: ICreateAccountDTO): Promise<IAccountResponse>
  findByEmail(email: string): Promise<IAccountResponse | null>
  findById(id: string): Promise<IAccountResponse | null>
}
