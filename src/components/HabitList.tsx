import React from 'react'
import HabitCard from './HabitCard'

type Habit = {
  _id: string;
  title: string;
  description: string;
  startGoal: Date;
  endGoal: Date;
  frequency: string;
  creator: {
    username: string;
    email: string;
  };
  difficulty: string;
  groups: string[];
};

const HabitList = ({ habits, status }) => {

  const habitsJSX = habits.map((habit: Habit) => <HabitCard {...habit} />)

  return (
    <article>
      <h3>{status}</h3>
      {habitsJSX}
    </article>
  )
}

export default HabitList