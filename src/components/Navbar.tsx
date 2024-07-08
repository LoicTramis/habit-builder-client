import React, { useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import { AuthContext } from '../context/AuthContextWrapper'

const Navbar = () => {
  const modal = useRef(null)
  const [showPage, setShowPage] = useState(false)
  const authenticateUser = useContext(AuthContext)

  const handleShowModal = (e: React.MouseEvent) => {
    e.preventDefault()
    modal.current.showModal()

  }

  const handleSwitchModal = () => {
    setShowPage(!showPage)
  }
  const handleDisconnet = () => {
    authenticateUser.disconnect()
  }

  const authUserJSX = () => {
    return authenticateUser.isLoggedIn
      ?
      <>
        <p>{authenticateUser.user.username}</p>
        <button onClick={handleDisconnet}>DC</button>
      </>
      : <button onClick={handleShowModal}>Log in / Sign up</button>
  }

  return (
    <nav>
      <dialog ref={modal}>
        {showPage ?
          <>
            <SignupPage modal={modal} showPage={showPage} setShowPage={setShowPage} />
            <p>
              Already have an account? <button onClick={handleSwitchModal}>Login.</button>
            </p>
          </>
          :
          <>
            <LoginPage modal={modal} />
            <p>
              No account? <button onClick={handleSwitchModal}>Sign up!</button>
            </p>
          </>
        }
      </dialog>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li>{authUserJSX()}</li>
        <li><NavLink to="/habits">Habits</NavLink></li>
        <li><NavLink to="/groups">Group</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar