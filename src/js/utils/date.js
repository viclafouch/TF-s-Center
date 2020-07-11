import { eachDayOfInterval, sub } from 'date-fns'

export const lastSevenDays = eachDayOfInterval({
  start: sub(new Date(), { days: 7 }),
  end: new Date()
})

export const copyDate = date => new Date(date.getTime())

export const getUnixFromDate = date => Math.round(date.getTime() / 1000)
