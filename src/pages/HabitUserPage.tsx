import { useEffect, useState } from 'react'
import { Habit } from '../types/Habit'
import service from '../service/api'
import HabitList from '../components/HabitList'
import Main from '../components/Main'

const HabitUserPage = () => {
  const [habits, setHabits] = useState<Habit[] | null>(null)

  const fetchGroups = async () => {
    try {
      const response = await service.get("/api/habits/in")
      setHabits(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  if (!habits) {
    return <p>Loading...</p>
  }

  const today = new Date();

  const upcomingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) < today);
  const ongoingHabits = habits.filter((habit: Habit) => new Date(habit.startDate) > today && new Date(habit.endDate) > today);
  const doneHabits = habits.filter((habit: Habit) => new Date(habit.endDate) < today)

  return (
    <Main title="My Habits">
      <section>
        <HabitList habits={upcomingHabits} status="Upcoming" />
        <HabitList habits={ongoingHabits} status="Ongoing" />
        <HabitList habits={doneHabits} status="Done" />
      </section>
    </Main>
  )
}

export default HabitUserPage