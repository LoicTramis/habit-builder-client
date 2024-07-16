import DescriptionIcon from './icons/DescriptionIcon'
import GroupIcon from './icons/GroupIcon'
import HabitIcon from './icons/HabitIcon'
import JoinIcon from './icons/JoinIcon'
import UserIcon from './icons/UserIcon'

const GroupCard = ({ name, description, admin, habits, members }) => {
  return (
    <li className='flex flex-col h-fit border-2 bg-white rounded-xl justify-around items-start gap-3 p-3 basis-1/3 w-full'>
      <h3 className='text-neutral-950 text-lg font-bold flex flex-row items-center'>{name}</h3>
      <article className='text-left'>
        <p>{description}</p>
      </article>
      <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><HabitIcon />Habits: {habits.length}</p>
      <p className='px-4 py-2 flex justify-start items-center gap-2 text-[#707070]'><GroupIcon />Members: {members.length}</p>


      <article className='flex justify-between items-center w-full'>
        <section className='flex'>
          <p className='py-1 px-2'>Made by {admin.username}</p>
          <div className='border-2 rounded-full border-[#f6f6f6] p-1 text-red-400 bg-red-300'>
            <UserIcon stroke="#f87171" fill="#f87171" />
          </div>
        </section>

        <section>
          <button id='join' className='flex gap-1 bg-sky-50 border border-sky-500 rounded mr-3 px-3 py-1'>
            <p className='font-bold text-sky-600'>Visit</p>
            <JoinIcon color="#0369a1" />
          </button>
        </section>
      </article>
    </li>
  )
}

export default GroupCard