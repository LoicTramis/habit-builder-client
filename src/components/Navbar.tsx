import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
        <li><NavLink to="/login">Log in</NavLink></li>
        <li><NavLink to="/habits">Habits</NavLink></li>
        <li><NavLink to="/groups">Group</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar