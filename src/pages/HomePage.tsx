import { Habit } from "../types/Habit";
import { Group } from "../types/Group";
import Main from "../components/Main";
import HabitList from "../components/HabitList";
import GroupList from "../components/GroupList";
import { HabitContext } from "../context/HabitContextWrapper";
import { useContext } from "react";

const HomePage = ({ groups }) => {
  const { habits } = useContext(HabitContext)

  if (!habits || !groups) {
    return <Main title=""><p>Loading</p></Main>
  }

  const filteredHabits = habits
    .toSorted((habit1: Habit, habit2: Habit) => habit2.members.length - habit1.members.length)
    .slice(0, 3);

  const filteredGroups = groups
    .toSorted((group1: Group, group2: Group) => group2.members.length - group1.members.length)
    .slice(0, 3);

  return (
    <Main title="Welcome to habit builder">
      <HabitList habits={filteredHabits} title="Top Habits" />
      <GroupList groups={filteredGroups} title="Top Groups" />
    </Main>
  );
};

export default HomePage;
