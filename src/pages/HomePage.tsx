import React, { useEffect, useState } from 'react'
import service from '../service/api'

// Display habits and groups
// Display nothing if no habits and no groups
type Habit = {
  id: string,
  title: string,
  description: string,
  startGoal: Date,
  endGoal: Date,
  frequency: string,
  creator: {
    username: string,
    email: string
  },
  difficulty: string,
  groups: string[]
}


const HomePage = () => {
  const [habits, setHabits] = useState<null | Habit[]>(null)

  const fetchHabits = async () => {
    try {
      const response = await service.get("/api/habits")
      setHabits(response.data)
    } catch (error) {
      // show some error on the screen
      console.log(error)
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (!habits) {
    return <p>Loading...</p>
  }

  const habitsJSX = habits.map((habit: Habit, index) => {
    if (index >= 3) return null
    return (
      <li key={habit.id}>
        <h3>{habit.title}</h3>
        <p>Made by {habit.creator?.username}</p>
        <p>{habit.difficulty}</p>
        <p>{habit.description}</p>
        {/* <p>Start: {Date(habit.startGoal).toString()}</p>
        <p>End: {habit.endGoal}</p> */}
        <p>Frequency: {habit.frequency}</p>
        <p>Groups: {habit.groups}</p>
        <hr />
      </li>
    )
  })
  // TODO DO THE SEARCH

  return (
    <main className='w-5/6'>
      <ul>
        {habitsJSX}
      </ul>
    </main>
  )
}

export default HomePage