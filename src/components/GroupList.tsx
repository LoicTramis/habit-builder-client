import GroupCard from './GroupCard'
import { Group } from '../types/Group'

const GroupList = ({ groups, title }) => {
  const groupsJSX = groups.map((group: Group) => <GroupCard key={group._id} {...group} />)
  return (
    <article>
      <h2>{title}</h2>
      <ul>
        {groupsJSX}
      </ul>
    </article>
  )
}

export default GroupList