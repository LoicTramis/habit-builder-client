import React, { useContext, useState } from 'react'
import DifficultyIcon from './icons/DifficultyIcon'
import FrequencyIcon from './icons/FrequencyIcon'
import DateIcon from './icons/DateIcon'
import DescriptionIcon from './icons/DescriptionIcon'
import GroupIcon from './icons/GroupIcon'
import { AuthContext } from '../context/AuthContextWrapper'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'
import getCalendar from '../utils/calendar'
import ChevronLeft from './icons/ChevronLeft'
import ChevronRight from './icons/ChevronRight'

const HabitForm = ({ habitForm, members, creator, startDate, endDate, monthNames, handleSubmitForm, handleChange, handleCancel }) => {
  const [startDay, setStartDay] = useState(new Date(startDate))
  const [endDay, setEndDay] = useState(new Date(endDate))
  const [calendarMonth, setCalendarMonth] = useState(startDay.getMonth())
  const authenticateUser = useContext(AuthContext)

  const handleSideMonth = (event, side: string) => {
    event.preventDefault()
    if (side === "previous") {
      setCalendarMonth(prev => prev - 1)
      // setStartDay(prev => new Date(prev.getMonth() - 1))
    } else {
      setCalendarMonth(prev => prev + 1)
      // setStartDay(prev => new Date(prev.getMonth() + 1))
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} className='flex justify-between w-full'>
        {/* ////                           //// */}
        {/* // *        Description        * // */}
        {/* // *   Difficulty & Frenquency * // */}
        {/* // *          Members          * // */}
        {/* ////                           //// */}
        <section className='flex flex-col basis-1/3'>
          <article>
            <p className='px-4 pt-2 flex justify-start items-center gap-2 text-neutral-950 font-bold'><DescriptionIcon />Description</p>
            <textarea
              name="description"
              id="description"
              value={habitForm.description}
              onChange={handleChange}
              rows={5}
              className='w-full ml-4 mt-1 px-2 py-1 text-[#060606] border rounded border-neutral-200'></textarea>
          </article>

          <article className=' flex px-4 py-2 gap-2 items-center'>
            <p className='flex gap-2'><DifficultyIcon />Difficulty</p>
            <select
              name="difficulty"
              id="difficulty"
              value={habitForm.difficulty}
              onChange={handleChange}
              className='text-[#060606] col-span-2 x-2 py-1 border rounded border-neutral-200'>
              <option value="-1" className='px-2 py-1'>-- Select a difficulty --</option>
              <option value="Easy" className='px-2 py-1 bg-emerald-200 text-emerald-800'>Easy</option>
              <option value="Medium" className='px-2 py-1 bg-orange-200 text-orange-800'>Medium</option>
              <option value="Hard" className='px-2 py-1 bg-red-200 text-red-800'>Hard</option>
              <option value="Challenger" className='px-2 py-1 bg-purple-200 text-purple-800'>Challenger</option>
              <option value="Goggins" className='px-2 py-1 bg-neutral-600 text-neutral-200'>Goggins</option>
            </select>
          </article>

          <article className=' flex px-4 py-2 gap-2 items-center'>
            <p className='flex gap-2'><FrequencyIcon />Frequency</p>
            <input
              type="text"
              name="frequency"
              id="frequency"
              value={habitForm.frequency}
              onChange={handleChange}
              className='px-2 py-1 text-[#060606] border rounded border-neutral-200' />
          </article>

          <article className=' flex px-4 py-2 gap-2'>
            <p className='flex gap-2'><GroupIcon />Members</p>
            <p className='text-[#060606]'>{members.length} participants</p>
          </article>
        </section>
        {/* ////                           //// */}
        {/* // *        Month & Year       * // */}
        {/* // *          Calendar         * // */}
        {/* ////                           //// */}
        <section className='flex flex-col basis-1/3'>
          <article className='flex flex-col gap-3 px-4 py-2  text-[#707070]'>
            <section className='flex flex-row justify-around items-center font-bold text-lg text-center text-neutral-950'>
              <button onClick={(e) => handleSideMonth(e, "previous")} className='p-1 hover:bg-neutral-100 rounded'><ChevronLeft /></button>
              <p>{monthNames[calendarMonth]} {startDay.getFullYear()}</p>
              <button onClick={(e) => handleSideMonth(e, "next")} className='p-1 hover:bg-neutral-100 rounded'><ChevronRight /></button>
            </section>
          </article>

          <article>
            <ul className='col-span-3'>
              {getCalendar(startDay.getFullYear(), calendarMonth).map((line: object[], index: number) => (
                <li key={index} className='flex justify-center '>
                  <ul className='flex'>
                    {line.map((day: Date) => {
                      // CSS: for days
                      // day -> gray, days of months -> black
                      // CSS: side days -> gray, days of months -> black
                      let color = ""
                      if (day.getMonth() === calendarMonth) {
                        color = "text-neutral-950"
                      } else {
                        color = "text-neutral-300"
                      }
                      // CSS: start day
                      if (day.getDate() === startDay.getDate() && day.getMonth() === startDay.getMonth()) {
                        color = " bg-indigo-200 text-indigo-800 border-indigo-300"
                      }
                      // CSS: end day
                      if (day.getDate() === endDay.getDate() && day.getMonth() === endDay.getMonth()) {
                        color = " bg-pink-200 text-pink-800 border-pink-300"
                      }

                      return <li key={day.getDate()} className={`border rounded w-12 h-12 p-4 m-1  ${color} flex justify-center items-center`}>{day.getDate()}</li>
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </article>
        </section>
        {/* ////                           //// */}
        {/* // *      Start & End Date     * // */}
        {/* ////                           //// */}
        <section className="flex flex-col basis-1/3 justify-between">
          <article className='flex items-center px-4 py-2 gap-2 text-[#707070]'>
            <p className='flex gap-2 px-2 py-1 w-24 border rounded bg-indigo-200 text-indigo-800 border-indigo-300'><DateIcon />Start</p>
            <input
              type='date'
              name="startDate"
              id="startDate"
              value={habitForm.startDate}
              onChange={handleChange}
              className='col-span-2 px-2 py-1 text-[#060606] border rounded border-neutral-200' />
          </article>
          <article className='flex items-center px-4 py-2 gap-2 text-[#707070]'>
            <p className='flex gap-2 px-2 py-1 w-24 border rounded bg-pink-200 text-pink-800 border-pink-300'><DateIcon />End</p>
            <input
              type='date'
              name="endDate"
              id="endDate"
              value={habitForm.endDate}
              onChange={handleChange}
              className='col-span-2 px-2 py-1 text-[#060606] border rounded border-neutral-200' />
          </article>
        </section>
      </form>
      {authenticateUser.isLoggedIn && authenticateUser.user._id === creator._id &&
        <article className=' w-full flex justify-between'>
          <button type="reset" onClick={handleCancel} className='flex items-start gap-1 m-3 p-2 font-bold text-zinc-500 opacity-70 hover:opacity-100'>
            <CancelIcon size={"size-5"} />Cancel
          </button>
          <button type='submit' className='flex items-start gap-1 m-3 p-2 font-bold text-emerald-500 opacity-70 hover:opacity-100'>
            <SaveIcon size={"size-5"} />Save
          </button>
        </article>
      }
    </>
  )
}

export default HabitForm