import { ICreateAccountSessionDTO } from '../dtos/ICreateAccountSessionDTO'

export interface IAccountSessionResponse {
  id: string
  user_id: string
  refresh_token: string
  expires_at: Date
  created_at: Date
}

export interface IRequest {
  user_id: string
  refresh_token: string
}

export interface IAccountsSessionRepository {
  create({
    user_id,
    refresh_token,
    expires_at,
  }: ICreateAccountSessionDTO): Promise<IAccountSessionResponse>
  findByUserIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IRequest): Promise<IAccountSessionResponse | null>
  delete(id: string): Promise<void>
}
