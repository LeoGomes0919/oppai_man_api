import { IAccountResponseDTO } from '../dtos/IAccountResponseDTO'
import { IAccountResponse } from '../repositories/IAccountsRepository'

export class AccountMap {
  static toDTO({
    id,
    email,
    developer,
    customer,
  }: IAccountResponse): IAccountResponseDTO {
    const account = {
      id,
      email,
      developer,
      customer,
    }

    if (developer && account.developer) {
      Object.assign(account.developer, {
        id: developer.id,
        name: developer.name,
      })
    }

    if (customer && account.customer) {
      Object.assign(account.customer, {
        id: customer.id,
        name: customer.name,
      })
    }

    Object.entries(account).forEach(([key, value]) => {
      if (!value) {
        delete account[key as keyof IAccountResponseDTO]
      }
    })
    return account
  }
}
