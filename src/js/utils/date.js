import { getDateFormat } from "./utils";

export const sevenLastDays = Array(7).fill().map((e, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i);
  return {
    date: getDateFormat(date),
    videos: 0
  }
});