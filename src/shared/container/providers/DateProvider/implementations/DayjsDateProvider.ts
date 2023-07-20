import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { IDateProvider, ISubstractDaysResult } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  convertToUTC(date: Date): Date {
    return dayjs(date).utc().local().toDate()
  }

  subtractDays(days: number): ISubstractDaysResult {
    return {
      endOf: dayjs().endOf('day').toDate(),
      startOf: dayjs().subtract(days, 'days').startOf('day').toDate(),
    }
  }
}
