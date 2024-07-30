import { useContext, useEffect, useState } from "react";
import HabitList from "../components/HabitList";
import service from "../service/api";
import { Habit } from "../types/Habit";
import Main from "../components/Main";
import { BuilderContext } from "../context/BuilderContextWrapper";


const HabitsPage = () => {
  const { habits, setHabits } = useContext(BuilderContext)

  const fetchHabits = async () => {
    try {
      const response = await service.get("/api/habits");
      setHabits(response.data);
    } catch (error) {
      // show some error on the screen
      console.log(error);
    }
  };
  const today = new Date();

  useEffect(() => {
    fetchHabits();
  }, []);

  if (!habits) {
    return <Main title=""><p>Loading</p></Main>;
  }

  const upcomingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) > today);
  const ongoingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) < today && new Date(habit.endDate) > today);
  const doneHabits = habits.filter((habit: Habit) => new Date(habit.endDate) < today);

  return (
    <Main title="Explore habits">
      <section className="grid grid-cols-3">
        <HabitList habits={upcomingHabits} title="Upcoming" />
        <HabitList habits={ongoingHabits} title="Ongoing" />
        <HabitList habits={doneHabits} title="Expired" />
      </section>
    </Main>
  );
};

export default HabitsPage;
