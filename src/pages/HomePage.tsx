import React, { useEffect, useState } from "react";
import service from "../service/api";
import HabitCard from "../components/HabitCard";
import GroupCard from "../components/GroupCard";
import { Habit } from "../types/Habit";
import { Group } from "../types/Group";

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

  if (!habits) {
    return <p>Loading...</p>;
  }

  const filteredHabits = habits
    .toSorted((habit1: Habit, habit2: Habit) => habit2.groups.length - habit1.groups.length)
    .slice(0, 3);

  const filteredGroups = groups
    .toSorted((group1: Group, group2: Group) => group2.members.length - group1.members.length)
    .slice(0, 3);

  const habitsJSX = filteredHabits.map((habit: Habit) => {
    return (
      <HabitCard key={habit._id} {...habit} />
    );
  });

  const groupsJSX = filteredGroups.map((group: Group) => {
    return (
      <GroupCard key={group._id} {...group} />
    )
  })

  return (
    <main>
      <article>
        <h2>Top Habits</h2>
        <ul>{habitsJSX}</ul>
      </article>

      <article>
        <h2>Top Groups</h2>
        <ul>{groupsJSX}</ul>
      </article>
    </main>
  );
};

export default HomePage;
