import DescriptionIcon from './icons/DescriptionIcon'
import GroupIcon from './icons/GroupIcon'
import HabitIcon from './icons/HabitIcon'

const GroupCard = ({ name, description, admin, habits, members }) => {
  return (
    <li className='border border-b-[#c7c7c7] bg-[#f6f6f6] shadow-center-xl flex rounded-2xl justify-center items-center p-2 basis-1/3 w-full h-full'>
      <section className='border border-b-[#c7c7c7] bg-[#fefefe] shadow-center-sm rounded-xl w-full h-full'>
        <h3 className='border-b border-b-[#c7c7c7] bg-[#f6f6f6] text-[#707070] rounded-tl-xl rounded-tr-xl flex justify-center
        items-center px-4 py-1'>{name}</h3>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><HabitIcon />Habits: {habits.length}</p>
        <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><GroupIcon />Members: {members.length}</p>
        <p className='px-4 pt-2 flex justify-start items-center gap-2 text-[#707070]'><DescriptionIcon />Description</p>
        <p className='px-4 py-2 h-36'>{description}</p>
        <p className='px-4 py-2 flex justify-end items-end'>Made by {admin.username}</p>
      </section>
    </li>
  )
}

export default GroupCard