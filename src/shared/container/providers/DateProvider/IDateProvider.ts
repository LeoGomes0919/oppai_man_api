export interface IDateProviderSubstractDays {
  days: number
  endOfDays?: boolean
  startOfDays?: boolean
}

export interface ISubstractDaysResult {
  endOf: Date
  startOf: Date
}

export interface IDateProvider {
  addDays(days: number): Date
  dateNow(): Date
  convertToUTC(date: Date): Date
  subtractDays(days: number): ISubstractDaysResult
}
