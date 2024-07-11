import { useContext, useState } from 'react'
import { simpleFormatDate } from '../utils/date'
import DateIcon from './icons/DateIcon'
import DescriptionIcon from './icons/DescriptionIcon'
import DifficultyIcon from './icons/DifficultyIcon'
import FrequencyIcon from './icons/FrequencyIcon'
import GroupIcon from './icons/GroupIcon'
import HashtagIcon from './icons/HashtagIcon'
import { AuthContext } from '../context/AuthContextWrapper'
import service from '../service/api'
import { useNavigate } from 'react-router-dom'
import { Habit } from '../types/Habit'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'

const HabitCard = ({ habits, setHabits, _id, title, creator, difficulty, description, startDate, endDate, frequency, members, rank = 0 }) => {
  const [editMode, setEditMode] = useState(false)
  const [habitForm, setHabitForm] = useState({
    title: "",
    description: "",
    difficulty: "-1",
    frequency: "",
    startDate: "",
    endDate: ""
  })
  const authenticateUser = useContext(AuthContext)
  const navigate = useNavigate()

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
      const updatedHabit = habits.map((habit: Habit) => {
        if (response.data._id === habit._id) {
          return response.data
        }
        return habit
      })
      setHabits(updatedHabit)
    } catch (error) {
      console.log(error)
    } finally {
      setEditMode(false)
    }
  }

  const habitContentJSX = () => {
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
      <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
        <p className='flex gap-2'><DifficultyIcon />Difficulty</p>
        <p className='text-[#060606]'>{difficulty}</p>
      </article>
      <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
        <p className='flex gap-2'><FrequencyIcon />Frequency</p>
        <p className='text-[#060606]'>{frequency}</p>
      </article>
      <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
        <p className='flex gap-2'><DateIcon />Start</p>
        <p className='col-span-2 text-[#060606]'>{simpleFormatDate(startDate)}</p>
      </article>
      <article className='grid grid-cols-3 px-4 py-2 gap-2 text-[#707070]'>
        <p className='flex gap-2'><DateIcon />End</p>
        <p className='col-span-2 text-[#060606]'>{simpleFormatDate(endDate)}</p>
      </article>
      <article>
        <p className='px-4 pt-2 flex justify-start items-center gap-2 text-[#707070]'><DescriptionIcon />Description</p>
        <p className='px-4 py-2 h-36'>{description}</p>
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
        <article className='flex justify-between'>
          <button onClick={handleDelete} className='flex items-start gap-1 m-3 p-2 font-bold text-red-500 opacity-70 hover:opacity-100'><DeleteIcon size={"size-5"} />Delete</button>
          <button onClick={handleEdit} className='flex items-start gap-1 m-3 p-2 font-bold text-blue-500 opacity-70 hover:opacity-100'><EditIcon size={"size-5"} />Edit</button>
        </article>
      }
    </>


  }
  // Try a grid layout to align content on the left
  return (
    <li className='border border-b-[#c7c7c7] bg-[#f6f6f6] shadow-center-xl flex rounded-2xl justify-center items-center p-2 basis-1/3 w-full h-full'>
      <section className='border border-b-[#c7c7c7] bg-[#fefefe] shadow-center-sm rounded-xl w-full h-full'>
        <h3 className='border-b border-b-[#c7c7c7] bg-[#f6f6f6] text-[#707070] rounded-tl-xl rounded-tr-xl flex justify-center
        items-center  px-4 py-1'>
          {rank !== 0
            ? (<><HashtagIcon strokeWidth={2} size={"size-4"} /> {rank} - {title}</>)
            : (title)
          }
        </h3>


        {habitContentJSX()}
      </section>
    </li >
  )
}

export default HabitCard