import c from 'calendar'

const cal = new c.Calendar()

/**
 * 
 * @param year 
 * @param month 
 * @returns array[][]
 */
const getCalendar = (year, month) => {
  return cal.monthDates(year, month)

}

export default getCalendar