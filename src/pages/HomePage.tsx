import { useEffect, useState } from "react";
import service from "../service/api";
import HabitCard from "../components/HabitCard";
import GroupCard from "../components/GroupCard";
import { Habit } from "../types/Habit";
import { Group } from "../types/Group";
import Main from "../components/Main";
import HabitList from "../components/HabitList";
import GroupList from "../components/GroupList";

const HomePage = () => {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const [groups, setGroups] = useState<Group[] | null>(null);

  const fetchHabits = async () => {
    try {
      const response = await service.get("/api/habits");
      setHabits(response.data);
    } catch (error) {
      // show some error on the screen
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await service.get("/api/groups");
      setGroups(response.data);
    } catch (error) {
      // show some error on the screen
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchGroups();
  }, []);

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
