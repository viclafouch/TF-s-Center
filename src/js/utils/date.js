import { eachDayOfInterval, sub } from 'date-fns'

export const getDateFormat = date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

export const lastSevenDays = eachDayOfInterval({
  start: sub(new Date(), { days: 7 }),
  end: new Date()
})

const months = Array.from({ length: 12 }, (x, index) => new Date(0, index).toLocaleDateString('en-US', { month: 'short' }))

export const getDateAwesome = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

export const copyDate = date => new Date(date.getTime())

export const isValidDate = date => date instanceof Date && !isNaN(date)

export const getUnixFromDate = date => Math.round(date.getTime() / 1000)
