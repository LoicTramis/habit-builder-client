import { useContext } from 'react'
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

const HabitCard = ({ habits, setHabits, _id, title, creator, difficulty, description, startDate, endDate, frequency, members, rank = 0 }) => {
  const authenticateUser = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDelete = async () => {
    const deletedHabit = await service.delete(`/api/habits/${_id}`)
    console.log(deletedHabit)
    const newHabits = habits.filter((habit: Habit) => habit._id !== _id)
    setHabits(newHabits)
    // TODO: put a loader somewhere
    setTimeout(() => {
      navigate("/habits/in")
      // TODO: and display a message somewhere too
    }, 300)
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
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><DifficultyIcon />Difficulty {difficulty}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><FrequencyIcon />Frequency {frequency}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><DateIcon />Start <span className='mr-5'>{simpleFormatDate(startDate)}</span></p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><DateIcon />End <span className='mr-auto'>{simpleFormatDate(endDate)}</span></p>
        <p className='px-4 pt-2 flex justify-start items-center gap-2 text-[#707070]'><DescriptionIcon />Description</p>
        <p className='px-4 py-2 h-36'>{description}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><GroupIcon /> Members: {members.length} participants</p>
        <p className='px-4 py-2 flex justify-end items-end'>Made by {creator.username}</p>
        {authenticateUser.isLoggedIn && authenticateUser.user._id === creator._id &&
          <button onClick={handleDelete} className='m-3 p-2 text-lg text-neutral-800 font-bold flex bg-red-500 bg-opacity-70 border border-red-500 rounded hover:bg-opacity-100'>Delete</button>
        }
      </section>
    </li >
  )
}

export default HabitCard