import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import { BuilderContext } from "../context/BuilderContextWrapper";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { Habit } from "../types/Habit";
import { Group } from "../types/Group";
import { User } from "../types/User";
import LoginIcon from "./icons/LoginIcon";
import LogoutIcon from "./icons/LogoutIcon";
import AddIcon from "./icons/AddIcon";
import HomeIcon from "./icons/HomeIcon";
import HabitIcon from "./icons/HabitIcon";
import GroupIcon from "./icons/GroupIcon";

const Navbar = () => {
  const [showPage, setShowPage] = useState(false);
  const { habits, groups } = useContext(BuilderContext)
  const authenticateUser = useContext(AuthContext);
  const navigate = useNavigate();
  const modal = useRef(null);

  ////-------------------------////
  // *         HANDLES         * //
  ////-------------------------////
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

  ////---------------------////
  // *         JSX         * //
  ////---------------------////
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
  const habitsJSX = () => {
    if (!habits) return <li className="sub-element pl-2"><em className="italic">There is no habit.</em></li>

    const filteredHabits = habits.filter((habit: Habit) => habit.creator.username === authenticateUser.user.username || habit.members.some((member: User) => member.username === authenticateUser.user.username))

    if (filteredHabits.length === 0) {
      return <li className="sub-element pl-2"><em className="italic">You have no habit.</em></li>
    }
    return filteredHabits.map((habit: Habit) => (
      <li key={habit._id} className="sub-element flex gap-2 px-1">
        <NavLink to={`/habits/${habit._id}`} className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950">
          <HabitIcon />{habit.title}
        </NavLink>
      </li>
    ))
  };
  const groupsJSX = () => {
    if (!groups) return
    if (groups.length === 0) {
      return <li className="sub-element pl-2"><em className="italic">You have no group.</em></li>
    }
    const filteredGroups = groups.filter((group: Group) => group.admin.username === authenticateUser.user.username || group.members.some((member: User) => member.username === authenticateUser.user.username))
    return filteredGroups.map((group: Group) => (
      <li key={group._id} className="sub-element flex gap-2 px-1">
        <NavLink to={`/habits/${group._id}`} className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
            hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950">
          <GroupIcon />{group.name}
        </NavLink>
      </li>))
  };

  return (
    <nav>
      <dialog ref={modal} className="rounded-lg w-1/3 p-5">
        {showPage ? (
          <>
            <SignupPage modal={modal} showPage={showPage} setShowPage={setShowPage} />
            <p className="mt-5 flex gap-4 justify-end">
              Already have an account? <button onClick={handleSwitchModal} className="text-blue-500 underline">Login.</button>
            </p>
          </>
        ) : (
          <>
            <LoginPage modal={modal} />
            <p className="mt-5 flex gap-4 justify-end">
              No account? <button onClick={handleSwitchModal} className="text-blue-500 underline">Sign up!</button>
            </p>
          </>
        )}
      </dialog>

      <ul className="element">
        <li className="sub-title w-full flex justify-between">{authUserJSX()}</li>
      </ul>

      <ul className="element">
        <li className="sub-title">
          <NavLink to="/" className="flex items-center gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><HomeIcon />Home</NavLink>
        </li>
      </ul>

      <ul className="element">
        <li className="sub-title">Discover</li>
        <li className="sub-element">
          <NavLink to="/habits" className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><HabitIcon />Habits</NavLink>
        </li>
        <li className="sub-element" >
          <NavLink to="/groups" className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-neutral-300 hover:text-neutral-950"><GroupIcon />Groups</NavLink>
        </li>
      </ul>

      {
        authenticateUser.isLoggedIn &&
        <>
          <ul className="element">
            <li className="sub-title">
              <NavLink to="/habits/in">My habits</NavLink>
            </li>
            {/* LIST OF HABITS HERE */}
            {habitsJSX()}
            <li className="sub-element">
              <button className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent text-green-600
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-green-400 " onClick={handleCreateHabit}><AddIcon />Add a habit</button>
            </li>
          </ul>

          <ul className="element">
            <li className="sub-title">
              <NavLink to="/groups/in">My groups</NavLink>
            </li>
            {/* LIST OF GROUPS HERE */}
            {groupsJSX()}
            <li className="sub-element">
              <button className="flex gap-2 w-full px-1 py-[0.3rem] rounded-lg border-[1px] border-transparent text-green-600
                hover:bg-neutral-50 hover:border-[1px] hover:shadow-sm hover:border-green-400 " onClick={handleCreateGroup}><AddIcon />Add a group</button>
            </li>
          </ul>
        </>
      }
    </nav >
  );
};

export default Navbar;
