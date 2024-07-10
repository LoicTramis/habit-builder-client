import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { AuthContext } from "../context/AuthContextWrapper";

const Navbar = () => {
  const modal = useRef(null);
  const [showPage, setShowPage] = useState(false);
  const authenticateUser = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowModal = (e: React.MouseEvent) => {
    e.preventDefault();
    modal.current.showModal();
  };

  const handleSwitchModal = () => {
    setShowPage(!showPage);
  };
  const handleDisconnet = () => {
    authenticateUser.disconnect();
  };

  const authUserJSX = () => {
    return authenticateUser.isLoggedIn ? (
      <>
        <p>{authenticateUser.user.username}</p>
        <button onClick={handleDisconnet}>DC</button>
      </>
    ) : (
      <button onClick={handleShowModal}>Log in / Sign up</button>
    );
  };

  const handleCreateHabit = () => {
    if (!authenticateUser.isLoggedIn) {
      // display message for log in
      return;
    }
    navigate("/createHabit");
  };

  const handleCreateGroup = () => {
    if (!authenticateUser.isLoggedIn) {
      // display message for log in
      return;
    }
    navigate("/createGroup");
  };
  return (
    <nav>
      <dialog ref={modal}>
        {showPage ? (
          <>
            <SignupPage modal={modal} showPage={showPage} setShowPage={setShowPage} />
            <p>
              Already have an account? <button onClick={handleSwitchModal}>Login.</button>
            </p>
          </>
        ) : (
          <>
            <LoginPage modal={modal} />
            <p>
              No account? <button onClick={handleSwitchModal}>Sign up!</button>
            </p>
          </>
        )}
      </dialog>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>{authUserJSX()}</li>
        <li>
          <NavLink to="/habits">Explore Habits</NavLink>
        </li>
        <li>
          <NavLink to="/groups">Explore Groups</NavLink>
        </li>
        {/* Auth user only */}

        {authenticateUser.isLoggedIn &&
          <>
            <li>
              <NavLink to="/habits/in">My habits</NavLink>
            </li>
            <li>
              <button onClick={handleCreateHabit}>Create habit</button>
            </li>
            <li>
              <NavLink to="/groups/in">My groups</NavLink>
            </li>
            <li>
              <button onClick={handleCreateGroup}>Create group</button>
            </li>
          </>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
