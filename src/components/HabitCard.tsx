import React from 'react'
import { formatDate } from '../utils/date'

const HabitCard = ({ title, creator, difficulty, description, startGoal, endGoal, frequency, groups }) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>Made by {creator?.username}</p>
      <p>{difficulty}</p>
      <p>{description}</p>
      <p>Start: {formatDate(startGoal)}</p>
      <p>End: {formatDate(endGoal)}</p>
      <p>Frequency: {frequency}</p>
      <p>Groups: {groups.length}</p>
      <hr />
    </li>
  )
}

export default HabitCard