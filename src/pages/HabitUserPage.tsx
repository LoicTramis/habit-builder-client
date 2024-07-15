import { useContext, useEffect, useState } from 'react'
import { Habit } from '../types/Habit'
import service from '../service/api'
import HabitList from '../components/HabitList'
import Main from '../components/Main'
import { HabitContext } from '../context/HabitContextWrapper'

const HabitUserPage = () => {
  const { habits, setHabits } = useContext(HabitContext)
  const fetchHabits = async () => {
    try {
      const response = await service.get("/api/habits/in")
      setHabits(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (!habits) {
    return <Main title=""><p>Loading</p></Main>
  }

  const today = new Date();

  const upcomingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) < today);
  const ongoingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) > today && new Date(habit.endDate) > today);
  const doneHabits = habits.filter((habit: Habit) => new Date(habit.endDate) < today)

  return (
    <Main title="My Habits">
      <section>
        <HabitList habits={upcomingHabits} title="Upcoming" />
        <HabitList habits={ongoingHabits} title="Ongoing" />
        <HabitList habits={doneHabits} title="Done" />
      </section>
    </Main>
  )
}

export default HabitUserPage