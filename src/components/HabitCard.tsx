import { User } from '../types/User'
import { formatDate } from '../utils/date'

const HabitCard = ({ title, creator, difficulty, description, startDate, endDate, frequency, members }) => {
  const membersJSX = members.map((member: User) => <li key={member._id}>{member.username}</li>)
  return (
    <li>
      <h3>{title}</h3>
      <p>Made by {creator.username}</p>
      <p>{difficulty}</p>
      <p>{description}</p>
      <p>Start: {formatDate(startDate)}</p>
      <p>End: {formatDate(endDate)}</p>
      <p>Frequency: {frequency}</p>
      <ul>Members: {membersJSX}</ul>
      <hr />
    </li>
  )
}

export default HabitCard