import GroupCard from './GroupCard'
import { Group } from '../types/Group'

const GroupList = ({ groups, title }) => {
  const groupsJSX = groups.map((group: Group) => (
    <GroupCard key={group._id} {...group} />
  ))

  return (
    <article className='flex flex-col text-center items-center'>
      <h2 className='my-3'>{title}</h2>
      <ul className='grid grid-cols-1 gap-5 w-4/5 items-center'>
        {groupsJSX}
      </ul>
    </article>
  )
}

export default GroupList