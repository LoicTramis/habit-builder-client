import React from 'react'

const GroupCard = ({ name, description, admin, habits, members }) => {
  return (
    <li>
      <h3>{name}</h3>
      <p>Made by {admin.username}</p>
      <p>{description}</p>
      <p>Habits: {habits.length}</p>
      <p>Members: {members.length}</p>
      <hr />
    </li>
  )
}

export default GroupCard