import { useContext, useState } from 'react'
import { formatDate, monthNames, simpleFormatDate } from '../utils/date'
import DateIcon from './icons/DateIcon'
import DescriptionIcon from './icons/DescriptionIcon'
import DifficultyIcon from './icons/DifficultyIcon'
import FrequencyIcon from './icons/FrequencyIcon'
import GroupIcon from './icons/GroupIcon'
import { AuthContext } from '../context/AuthContextWrapper'
import service from '../service/api'
import { useNavigate } from 'react-router-dom'
import { Habit } from '../types/Habit'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'
import { BuilderContext } from '../context/BuilderContextWrapper'
import UserIcon from './icons/UserIcon'
import JoinIcon from './icons/JoinIcon'
import { User } from '../types/User'
import getCalendar from '../utils/calendar'
import ChevronLeft from './icons/ChevronLeft'
import ChevronRight from './icons/ChevronRight'

const colors = [
  ["text-blue-400 bg-blue-300", "#60a5fa"],
  ["-translate-x-3 text-red-400 bg-red-300", "#f87171"],
  ["-translate-x-6 text-emerald-400 bg-emerald-300", "#34d399"],
  ["-translate-x-9 text-yellow-400 bg-yellow-300", "#facc15"],
  ["-translate-x-12 text-lime-400 bg-lime-300", "#a3e635"],
  ["-translate-x-15 text-red-400 bg-red-300", "#34d399"],
]

const HabitCard = ({ _id, title, creator, difficulty, description, startDate, endDate, frequency, members, detailed = false }) => {
  const [editMode, setEditMode] = useState(false)
  const [habitForm, setHabitForm] = useState({
    description: "",
    difficulty: "-1",
    frequency: "",
    startDate: "",
    endDate: ""
  })
  const [startDay, setStartDay] = useState(new Date(startDate))
  const [endDay, setEndDay] = useState(new Date(endDate))
  const [calendarMonth, setCalendarMonth] = useState(startDay.getMonth())
  const authenticateUser = useContext(AuthContext)
  const { habits, setHabits } = useContext(BuilderContext)
  const navigate = useNavigate()

  ////-------------------------- ////
  // *          HANDLES          * //
  ////-------------------------- ////
  const handleDelete = async () => {
    // TODO: put a loader somewhere
    const deletedHabit = await service.delete(`/api/habits/${_id}`)
    console.log(deletedHabit)
    const newHabits = habits.filter((habit: Habit) => habit._id !== _id)
    setHabits(newHabits)

    setTimeout(() => {
      navigate("/habits/in")
      // TODO: and display a message somewhere too
    }, 300)
  }
  const handleEdit = async () => {
    setEditMode(true)
  }
  const handleCancel = () => {
    setEditMode(false)
  }
  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = (event.target as HTMLInputElement).name
    const value = (event.target as HTMLInputElement).value

    setHabitForm(prevHabitForm => ({
      ...prevHabitForm,
      [name]: value
    }))
  }
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await service.put(`/api/habits/${_id}`, habitForm)
      const updatedHabits = habits.map((habit: Habit) => {
        if (habit._id === response.data._id) {
          console.log(response.data)
          return response.data
        }
        return habit
      })
      // console.log(updatedHabits)
      setHabits(updatedHabits)
    } catch (error) {
      console.log(error)
    } finally {
      setEditMode(false)
    }
  }
  const handleView = (event) => {
    event.preventDefault()
    navigate(`/habits/${_id}`)
  }
  const handleSideMonth = (side: string) => {
    if (side === "previous") {
      setCalendarMonth(prev => prev - 1)
      // setStartDay(prev => new Date(prev.getMonth() - 1))
    } else {
      setCalendarMonth(prev => prev + 1)
      // setStartDay(prev => new Date(prev.getMonth() + 1))
    }
  }
  const handleJoin = async () => {
    await service.patch(`/api/habits/add/${_id}`)

    setTimeout(() => {
      navigate("/habits/in")
      // TODO: and display a message somewhere too
    }, 300)
  }
  const handleLeave = async () => {
    await service.patch(`/api/habits/remove/${_id}`)

    setTimeout(() => {
      navigate("/habits/in")
      // TODO: and display a message somewhere too
    }, 300)
  }

  ////-----------------------////
  // *          JSX          * //
  ////-----------------------////
  const habitContentJSX = () => {
    if (detailed) {
      if (editMode) {
        return <>
          <form onSubmit={handleSubmitForm}>
            <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2'><DifficultyIcon />Difficulty</p>
              <select
                name="difficulty"
                id="difficulty"
                value={habitForm.difficulty}
                onChange={handleChange}
                className='text-[#060606] col-span-2'>
                <option value="-1">-- Select a difficulty --</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Challenger">Challenger</option>
                <option value="Goggins">Goggins</option>
              </select>
            </article>
            <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2'><FrequencyIcon />Frequency</p>
              <input
                type="text"
                name="frequency"
                id="frequency"
                value={habitForm.frequency}
                onChange={handleChange}
                className='text-[#060606]' />
            </article>
            <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2'><DateIcon />Start</p>
              <input
                type='date'
                name="startDate"
                id="startDate"
                value={habitForm.startDate}
                onChange={handleChange}
                className='col-span-2 text-[#060606]' />
            </article>
            <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2'><DateIcon />End</p>
              <input
                type='date'
                name="endDate"
                id="endDate"
                value={habitForm.endDate}
                onChange={handleChange}
                className='col-span-2 text-[#060606]' />
            </article>
            <article>
              <p className='px-4 pt-2 flex justify-start items-center gap-2 text-[#707070]'><DescriptionIcon />Description</p>
              <textarea
                name="description"
                id="description"
                value={habitForm.description}
                onChange={handleChange}
                rows={5}
                className='px-4 py-2 h-36 w-full'></textarea>
            </article>
            <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2'><GroupIcon />Members</p>
              <p className='text-[#060606]'>{members.length} participants</p>
            </article>
            <article className='flex justify-end px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2'>Made by</p>
              <p className='text-[#060606]'>{creator.username}</p>
            </article>
            {authenticateUser.isLoggedIn && authenticateUser.user._id === creator._id &&
              <article className='flex justify-end'>
                <button type="reset" onClick={handleCancel} className='flex items-start gap-1 m-3 p-2 font-bold text-zinc-500 opacity-70 hover:opacity-100'><CancelIcon size={"size-5"} />Cancel</button>
                <button type='submit' className='flex items-start gap-1 m-3 p-2 font-bold text-emerald-500 opacity-70 hover:opacity-100'><SaveIcon size={"size-5"} />Save</button>
              </article>
            }
          </form>
        </>
      }
      return <>
        <article className='flex justify-between w-full'>
          {/* DISPLAY OF 
            - Description
            - Members */}
          <section className='flex flex-col basis-1/3'>
            <article>
              <p className='px-4 pt-2 flex justify-start items-center gap-2 text-neutral-950 font-bold'><DescriptionIcon />Description</p>
              <p className='px-4 py-2 w-[90%] h-36'>{description}</p>
            </article>

            <article className=' flex px-4 py-2 gap-2'>
              {difficulty === "Easy" && <p className='px-2 py-1 bg-emerald-200 text-emerald-800 rounded-md'>{difficulty}</p>}
              {difficulty === "Medium" && <p className='px-2 py-1 bg-orange-200 text-orange-800 rounded-md'>{difficulty}</p>}
              {difficulty === "Hard" && <p className='px-2 py-1 bg-red-200 text-red-800 rounded-md'>{difficulty}</p>}
              {difficulty === "Challenger" && <p className='px-2 py-1 bg-purple-200 text-purple-800 rounded-md'>{difficulty}</p>}
              {difficulty === "Goggins" && <p className='px-2 py-1 bg-neutral-600 text-neutral-200 rounded-md'>{difficulty}</p>}
              <p className='px-2 py-1 bg-neutral-200 text-neutral-800 rounded-md'>{frequency}</p>
            </article>

            <article className='px-4 py-2 gap-2 text-neutral-950 font-bold'>
              <p className='flex gap-2'><GroupIcon />Members</p>
              <ul className='flex font-normal flex-wrap'>
                <li key={_id}>{creator.username}</li>
                {members.map((member: User) => <li key={member._id}>, {member.username}</li>)}
              </ul>
            </article>

          </section>
          {/* DISPLAY OF 
            - Month
            - Calendar*/}
          <section className='flex flex-col basis-1/3'>
            <article className='flex flex-col gap-3 px-4 py-2  text-[#707070]'>
              <section className='flex flex-row justify-around items-center font-bold text-lg text-center text-neutral-950'>
                <button onClick={() => handleSideMonth("previous")} className='p-1 hover:bg-neutral-100 rounded'><ChevronLeft /></button>
                <p>{monthNames[calendarMonth]} {startDay.getFullYear()}</p>
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
          <section className="flex flex-col basis-1/3 justify-between">
            <article className='flex items-center px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2 px-2 py-1 w-24 border rounded bg-indigo-200 text-indigo-800 border-indigo-300'><DateIcon />Start</p>
              <p className='col-span-2 text-[#060606]'>{formatDate(startDate)}</p>
            </article>

            <article className='flex items-center px-4 py-2 gap-2 text-[#707070]'>
              <p className='flex gap-2 px-2 py-1 w-24 border rounded bg-pink-200 text-pink-800 border-pink-300'><DateIcon />End</p>
              <p className='col-span-2 text-[#060606]'>{formatDate(endDate)}</p>
            </article>
          </section>
        </article>
        <section className='flex flex-row'>
          {authenticateUser.isLoggedIn
            && (members.some((member: User) => member._id === authenticateUser.user._id) || creator._id === authenticateUser.user._id)
            &&
            <article className='flex justify-between items-center'>
              <button id='join' onClick={handleLeave} className='flex gap-1 h-fit bg-red-50 border border-red-500 text-red-600 rounded mr-3 px-3 py-1'>
                <p className='font-bold'>Leave habit</p>
              </button>
            </article>
          }
          {
            authenticateUser.isLoggedIn
            && (!members.some((member: User) => member._id === authenticateUser.user._id) && creator._id !== authenticateUser.user._id)
            &&
            <article className='flex justify-between'>
              <button id='join' onClick={handleJoin} className='flex gap-1 bg-sky-50 border border-sky-500 rounded mr-3 px-3 py-1'>
                <p className='font-bold text-sky-600'>Join</p>
              </button>
            </article>
          }
          {authenticateUser.isLoggedIn && authenticateUser.user._id === creator._id &&
            <article className='flex justify-between '>
              <button onClick={handleDelete} className='flex items-start gap-1 m-3 p-2 font-bold text-red-500 opacity-70 hover:opacity-100'><DeleteIcon size={"size-5"} />Delete</button>
              <button onClick={handleEdit} className='flex items-start gap-1 m-3 p-2 font-bold text-blue-500 opacity-70 hover:opacity-100'><EditIcon size={"size-5"} />Edit</button>
            </article>
          }
        </section>
      </>
    } else {
      return <>
        <article className='flex flex-row gap-3'>
          <p className='flex items-end gap-2 px-2 py-1 bg-neutral-100 rounded'>
            <DateIcon />
            {simpleFormatDate(startDate)} - {simpleFormatDate(endDate)}
          </p>
          {difficulty === "Easy" && <p className='px-2 py-1 bg-emerald-200 text-emerald-800 rounded-md'>{difficulty}</p>}
          {difficulty === "Medium" && <p className='px-2 py-1 bg-orange-200 text-orange-800 rounded-md'>{difficulty}</p>}
          {difficulty === "Hard" && <p className='px-2 py-1 bg-red-200 text-red-800 rounded-md'>{difficulty}</p>}
          {difficulty === "Challenger" && <p className='px-2 py-1 bg-purple-200 text-purple-800 rounded-md'>{difficulty}</p>}
          {difficulty === "Goggins" && <p className='px-2 py-1 bg-neutral-200 text-neutral-800 rounded-md'>{difficulty}</p>}
        </article>

        <article className='text-left m-2'>
          <p>{description}</p>
        </article>

        <article className='flex justify-between items-center w-full mt-7'>
          <section className='flex items-center'>
            {members.map((member: User, index: number) => (
              index < 3 && <div key={index} className={`border-2 rounded-[50%] border-[#f6f6f6] p-1 ${colors[index][0]}`}>
                <UserIcon stroke={colors[index][1]} fill={colors[index][1]} />
              </div>
            ))}
            {members.length === 0 && <p> 0 participant</p>}
            {members.length > 3 && <p className='-translate-x-4'>+ {members.length - 3} participants</p>}
          </section>
          <section>
            <button id='join' onClick={handleView} className='flex gap-1 bg-sky-50 border border-sky-500 rounded mr-3 px-3 py-1'>
              <p className='font-bold text-sky-600'>View</p>
              <JoinIcon color="#0369a1" />
            </button>
          </section>
        </article>
      </>
      // members and groups
    }
  }

  return (
    <li key={_id} className='flex flex-col h-fit border-2 bg-white rounded-xl justify-around items-start gap-3 p-3 basis-1/3 w-full'>
      <h3 className='text-neutral-950 text-lg font-bold flex flex-row items-center'>{title}</h3>
      {habitContentJSX()}
    </li>
  )
}

export default HabitCard