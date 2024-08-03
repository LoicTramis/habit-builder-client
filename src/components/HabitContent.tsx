import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContextWrapper'
import { User } from '../types/User'
import GroupIcon from './icons/GroupIcon'
import DescriptionIcon from './icons/DescriptionIcon'
import getCalendar from '../utils/calendar'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import { formatDate } from '../utils/date'
import ChevronLeft from './icons/ChevronLeft'
import ChevronRight from './icons/ChevronRight'
import DateIcon from './icons/DateIcon'

const HabitContent = (props) => {
  const [startDay, setStartDay] = useState(new Date(props.startDate))
  const [endDay, setEndDay] = useState(new Date(props.endDate))
  const [calendarMonth, setCalendarMonth] = useState(startDay.getMonth())
  const authenticateUser = useContext(AuthContext)

  const handleSideMonth = (side: string) => {
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
      <article className='flex justify-between w-full'>
        {/* //// --------------------------------//// */}
        {/* // *           Description           * // */}
        {/* // *      Difficulty & Frenquency    * // */}
        {/* // *             Members             * // */}
        {/* //// --------------------------------//// */}
        <section className='flex flex-col basis-1/3'>
          <article>
            <p className='px-4 pt-2 flex justify-start items-center gap-2 text-neutral-950 font-bold'><DescriptionIcon />Description</p>
            <p className='px-2 py-1 ml-4 mt-1 w-[90%] h-36 border rounded border-transparent'>{props.description}</p>
          </article>

          <article className=' flex px-4 py-2 gap-2'>
            {props.difficulty === "Easy" && <p className='px-2 py-1 bg-emerald-200 text-emerald-800 rounded-md'>{props.difficulty}</p>}
            {props.difficulty === "Medium" && <p className='px-2 py-1 bg-orange-200 text-orange-800 rounded-md'>{props.difficulty}</p>}
            {props.difficulty === "Hard" && <p className='px-2 py-1 bg-red-200 text-red-800 rounded-md'>{props.difficulty}</p>}
            {props.difficulty === "Challenger" && <p className='px-2 py-1 bg-purple-200 text-purple-800 rounded-md'>{props.difficulty}</p>}
            {props.difficulty === "Goggins" && <p className='px-2 py-1 bg-neutral-600 text-neutral-200 rounded-md'>{props.difficulty}</p>}
            <p className='px-2 py-1 bg-neutral-200 text-neutral-800 rounded-md'>{props.frequency}</p>
          </article>

          <article className='px-4 py-2 gap-2 text-neutral-950 font-bold'>
            <p className='flex gap-2'><GroupIcon />Members</p>
            <ul className='flex font-normal flex-wrap'>
              <li key={props._id}>{props.creator.username}</li>
              {props.members.map((member: User) => <li key={member._id}>, {member.username}</li>)}
            </ul>
          </article>

        </section>
        {/* //// --------------------------------//// */}
        {/* // *             Calendar            * // */}
        {/* //// --------------------------------//// */}
        <section className='flex flex-col basis-1/3'>
          <article className='flex flex-col gap-3 px-4 py-2  text-[#707070]'>
            <section className='flex flex-row justify-around items-center font-bold text-lg text-center text-neutral-950'>
              <button onClick={() => handleSideMonth("previous")} className='p-1 hover:bg-neutral-100 rounded'><ChevronLeft /></button>
              <p>{props.monthNames[calendarMonth]} {startDay.getFullYear()}</p>
              <button onClick={() => handleSideMonth("next")} className='p-1 hover:bg-neutral-100 rounded'><ChevronRight /></button>
            </section>
          </article>
          <article>
            <ul className='col-span-3'>
              {getCalendar(startDay.getFullYear(), calendarMonth).map((line: object[], index: number) => (
                <li key={index} className='flex justify-center '>
                  <ul className='flex'>
                    {line.map((day: Date) => {
                      // CSS for day of the month and side months
                      let color = ""
                      if (day.getMonth() === calendarMonth) {
                        color = "text-neutral-950"
                      } else {
                        color = "text-neutral-300"
                      }
                      // CSS for start day
                      if (day.getDate() === startDay.getDate() && day.getMonth() === startDay.getMonth()) {
                        color = " bg-indigo-200 text-indigo-800 border-indigo-300"
                      }
                      // CSS for end day
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
        {/* //// --------------------------------//// */}
        {/* // *         Start & End Date        * // */}
        {/* //// --------------------------------//// */}
        <section className="flex flex-col basis-1/3 justify-between">
          <article className='flex items-center px-4 py-2 gap-2 text-[#707070]'>
            <p className='flex gap-2 px-2 py-1 w-24 border rounded bg-indigo-200 text-indigo-800 border-indigo-300'><DateIcon />Start</p>
            <p className='col-span-2 text-[#060606]'>{formatDate(props.startDate)}</p>
          </article>

          <article className='flex items-center px-4 py-2 gap-2 text-[#707070]'>
            <p className='flex gap-2 px-2 py-1 w-24 border rounded bg-pink-200 text-pink-800 border-pink-300'><DateIcon />End</p>
            <p className='col-span-2 text-[#060606]'>{formatDate(props.endDate)}</p>
          </article>
        </section>
      </article>
      {/* // TODO MAKE A 3-dot menu  */}
      {/* ////                                   // */}
      {/* // *            COMMENTS             * // */}
      {/* // ?             - Info              * // */}
      {/* // $             - Pass              * // */}
      {/* // §             - Warning           * // */}
      {/* // TODO          - Alert             * // */}
      {/* // !             - Danger            * // */}
      {/* // *             - Cancel            * // */}
      {/* ////                                   // */}
      <section className='flex flex-row'>
        {authenticateUser.isLoggedIn
          && (props.members.some((member: User) => member._id === authenticateUser.user._id) || props.creator._id === authenticateUser.user._id)
          &&
          <article className='flex justify-between items-center'>
            <button id='join' onClick={props.handleLeave} className='flex gap-1 h-fit bg-red-50 border border-red-500 text-red-600 rounded mr-3 px-3 py-1'>
              <p className='font-bold'>Leave habit</p>
            </button>
          </article>
        }
        {
          authenticateUser.isLoggedIn
          && (!props.members.find((member: User) => member._id === authenticateUser.user._id) && props.creator._id !== authenticateUser.user._id)
          &&
          <article className='flex justify-between'>
            <button id='join' onClick={props.handleJoin} className='flex gap-1 bg-sky-50 border border-sky-500 rounded mr-3 px-3 py-1'>
              <p className='font-bold text-sky-600'>Join</p>
            </button>
          </article>
        }
      </section>
      {authenticateUser.isLoggedIn && authenticateUser.user._id === props.creator._id &&
        <article className='w-full flex justify-between'>
          <button onClick={props.handleDelete} className='flex items-start gap-1 m-3 p-2 font-bold text-red-500 opacity-70 hover:opacity-100'><DeleteIcon size={"size-5"} />Delete</button>
          <button onClick={props.handleEdit} className='flex items-start gap-1 m-3 p-2 font-bold text-blue-500 opacity-70 hover:opacity-100'><EditIcon size={"size-5"} />Edit</button>
        </article>
      }
    </>
  )
}

export default HabitContent