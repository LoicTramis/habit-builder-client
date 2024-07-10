import { User } from '../types/User'
import { formatDate, simpleFormatDate } from '../utils/date'
import AdminIcon from './icons/AdminIcon'
import DateIcon from './icons/DateIcon'
import DescriptionIcon from './icons/DescriptionIcon'
import DifficultyIcon from './icons/DifficultyIcon'
import FrequencyIcon from './icons/FrequencyIcon'
import GroupIcon from './icons/GroupIcon'
import HashtagIcon from './icons/HashtagIcon'

const HabitCard = ({ title, creator, difficulty, description, startDate, endDate, frequency, members, rank }) => {
  const membersJSX = members.map((member: User) => <li key={member._id}>{member.username}</li>)

  // Try a grid layout to align content on the left
  return (
    <li className='border border-b-[#c7c7c7] bg-[#f6f6f6] flex rounded-2xl shadow-center-lg justify-center items-center mx-2 my-1 w-[33%] h-auto'>
      <section className='border border-b-[#c7c7c7] bg-[#fefefe] rounded-xl shadow-center-sm h-[96%] w-[96%]'>
        <h3 className='border-b border-b-[#c7c7c7] bg-[#f6f6f6] text-[#707070] rounded-tl-xl rounded-tr-xl flex justify-center
        items-center  px-4 py-1'>
          <HashtagIcon strokeWidth={2} size={"size-4"} />
          {rank} - {title}
        </h3>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><DifficultyIcon />Difficulty {difficulty}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><FrequencyIcon />Frequency {frequency}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><DateIcon />Start <span className='mr-5'>{simpleFormatDate(startDate)}</span></p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><DateIcon />End <span className='mr-auto'>{simpleFormatDate(endDate)}</span></p>
        <p className='px-4 pt-2 flex justify-start items-center gap-2 text-[#707070]'><DescriptionIcon />Description</p>
        <p className='px-4 pb-2'>{description}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><GroupIcon /> Members: {members.length} participants</p>
        <p className='px-4 py-2 flex justify-end items-end'>Made by {creator.username}</p>
      </section>
    </li >
  )
}

export default HabitCard