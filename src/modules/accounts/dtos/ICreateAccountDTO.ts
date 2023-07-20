export enum Role {
  developer = 'DEVELOPER',
  customer = 'CUSTOMER',
}

export interface ICreateAccountDTO {
  name: string
  email: string
  password: string
  role: Role
}
