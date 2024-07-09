const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

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

export {
  formatDate
}