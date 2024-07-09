import React from 'react'
import { formatDate } from '../utils/date'

const HabitCard = ({ title, creator, difficulty, description, startDate, endDate, frequency, groups }) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>Made by {creator?.username}</p>
      <p>{difficulty}</p>
      <p>{description}</p>
      <p>Start: {formatDate(startDate)}</p>
      <p>End: {formatDate(endDate)}</p>
      <p>Frequency: {frequency}</p>
      <p>Groups: {groups.length}</p>
      <hr />
    </li>
  )
}

export default HabitCard