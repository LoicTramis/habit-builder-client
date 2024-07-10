import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { AuthContext } from "../context/AuthContextWrapper";
import LoginIcon from "./icons/LoginIcon";
import LogoutIcon from "./icons/LogoutIcon";
import AddIcon from "./icons/AddIcon";
import HomeIcon from "./icons/HomeIcon";
import ExploreIcon from "./icons/ExploreIcon";
import HabitIcon from "./icons/HabitIcon";
import GroupIcon from "./icons/GroupIcon";

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
        <button className="flex justify-between" id="profile" onClick={handleDisconnet}><LogoutIcon /></button>
      </>
    ) : (
      <button className="w-full flex justify-between px-2 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950" id="login" onClick={handleShowModal}>
        <p>Log in / Sign up</p>
        <LoginIcon />
      </button>
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
      <ul className="element">
        <li className="sub-title w-full flex justify-between">{authUserJSX()}</li>
      </ul>
      <ul className="element">
        <li className="sub-title">Discover</li>
        <li className="sub-element px-0">
          <NavLink to="/" className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><HomeIcon />Home</NavLink>
        </li>
        <li className="sub-element">
          <NavLink to='/' className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><ExploreIcon />Explore</NavLink>
        </li>
        <li className="sub-element">
          <NavLink to="/habits" className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><HabitIcon />Habits</NavLink>
        </li>
        <li className="sub-element" >
          <NavLink to="/groups" className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><GroupIcon />Groups</NavLink>
        </li>
      </ul>


      {/* Auth user only */}
      {authenticateUser.isLoggedIn &&
        <>
          <ul className="element">
            <li className="sub-title">
              <NavLink to="/habits/in">My habits</NavLink>
            </li>
            {/* LIST OF HABITS HERE */}
            <li className="sub-element">
              <button className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950" onClick={handleCreateHabit}><AddIcon />Add a habit</button>
            </li>
          </ul>

          <ul className="element">
            <li className="sub-title">
              <NavLink to="/groups/in">My groups</NavLink>
            </li>
            {/* LIST OF GROUPS HERE */}
            <li className="sub-element">
              <button className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950" onClick={handleCreateGroup}><AddIcon />Add a group</button>
            </li>
          </ul>
        </>
      }
    </nav>
  );
};

export default Navbar;
