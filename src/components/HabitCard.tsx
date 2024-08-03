import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BuilderContext } from '../context/BuilderContextWrapper'
import { monthNames, simpleFormatDate } from '../utils/date'
import { User } from '../types/User'
import { Habit } from '../types/Habit'
import service from '../service/api'
import DateIcon from './icons/DateIcon'
import UserIcon from './icons/UserIcon'
import JoinIcon from './icons/JoinIcon'
import HabitForm from './HabitForm'
import HabitContent from './HabitContent'

const colors = [
  ["text-blue-400 bg-blue-300", "#60a5fa"],
  ["-translate-x-3 text-red-400 bg-red-300", "#f87171"],
  ["-translate-x-6 text-emerald-400 bg-emerald-300", "#34d399"],
  ["-translate-x-9 text-yellow-400 bg-yellow-300", "#facc15"],
  ["-translate-x-12 text-lime-400 bg-lime-300", "#a3e635"],
  ["-translate-x-15 text-red-400 bg-red-300", "#34d399"],
]
const today = new Date()

const HabitCard = ({ _id, title, creator, difficulty, description, startDate, endDate, frequency, members, detailed = false }) => {
  const [editMode, setEditMode] = useState(false)
  const [habitForm, setHabitForm] = useState({
    description: "",
    frequency: "",
    difficulty: "-1",
    startDate: "",
    endDate: ""
  })
  const { habits, setHabits } = useContext(BuilderContext)
  const navigate = useNavigate()

  ////                           ////
  // *          HANDLES          * //
  ////                           ////
  const handleDelete = async () => {
    const deletedHabit = await service.delete(`/api/habits/${_id}`)
    console.log(deletedHabit)
    const newHabits = habits.filter((habit: Habit) => habit._id !== _id)
    setHabits(newHabits)
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
      console.log(habitForm)
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

  ////                       ////
  // *          JSX          * //
  ////                       ////
  const habitContentJSX = () => {
    if (detailed) {
      if (editMode) {
        return <HabitForm
          habitForm={habitForm}
          members={members}
          creator={creator}
          startDate={startDate}
          endDate={endDate}
          monthNames={monthNames}
          handleSubmitForm={handleSubmitForm}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      }
      return <HabitContent
        _id={_id}
        description={description}
        difficulty={difficulty}
        frequency={frequency}
        members={members}
        creator={creator}
        startDate={startDate}
        endDate={endDate}
        monthNames={monthNames}
        handleJoin={handleJoin}
        handleLeave={handleLeave}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
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