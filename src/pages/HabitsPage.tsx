import { useContext, useEffect, useState } from "react";
import HabitList from "../components/HabitList";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";
import { Habit } from "../types/Habit";


const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const authenticateUser = useContext(AuthContext);

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
    return <p>Loading</p>;
  }

  if (!authenticateUser.isLoggedIn) {
    return <p>Log in to see habits</p>;
  }

  const upcomingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) < today);
  const ongoingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) > today && new Date(habit.endDate) < today);
  const doneHabits = habits.filter((habit: Habit) => new Date(habit.endDate) > today);

  return (
    <main>
      <h2>Habits</h2>
      <section>
        <HabitList habits={upcomingHabits} status="Upcoming" />
        <HabitList habits={ongoingHabits} status="Ongoing" />
        <HabitList habits={doneHabits} status="Done" />
      </section>
    </main>
  );
};

export default HabitsPage;
