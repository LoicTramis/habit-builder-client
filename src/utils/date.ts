const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Format ISO date to UTC type date
 * 
 * @param ISOStringDate Date
 * @returns string
 */
const formatDate = (ISOStringDate: Date) => {
  const newDate = new Date(ISOStringDate)
  const dayWeek = dayNames[newDate.getDay()]
  const dayMonth = newDate.getDate()
  const month = monthNames[newDate.getMonth()]
  const year = newDate.getFullYear()
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  const meridiem = hours < 13 ? "AM" : "PM"

  return `${dayWeek}, ${dayMonth} ${month} ${year} at ${hours}:${minutes} ${meridiem}`
}
const simpleFormatDate = (ISOStringDate: Date) => {
  const newDate = new Date(ISOStringDate)
  const dayWeek = shortDayNames[newDate.getDay()]
  const dayMonth = newDate.getDate()
  const month = shortMonthNames[newDate.getMonth()]
  const year = newDate.getFullYear().toString().at(-2) + newDate.getFullYear().toString().at(-1)
  const hours = newDate.getHours() > 13 ? newDate.getHours() - 12 : newDate.getHours()
  const minutes = newDate.getMinutes()
  const meridiem = newDate.getHours() < 13 ? "am" : "pm"

  return `${dayMonth} ${month} ${year} - ${hours} ${meridiem}`
}

export {
  formatDate,
  simpleFormatDate
}