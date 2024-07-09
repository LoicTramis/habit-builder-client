import GroupCard from './GroupCard'
import { Group } from '../types/Group'

const GroupList = ({ groups }) => {
  const groupsJSX = groups.map((group: Group) => <GroupCard key={group._id} {...group} />)
  console.log(groupsJSX)
  return (
    <article>
      <ul>
        {groupsJSX}
      </ul>
    </article>
  )
}

export default GroupList