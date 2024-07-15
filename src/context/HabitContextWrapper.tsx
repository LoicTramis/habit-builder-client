import { createContext, useState } from 'react'
import { Habit } from '../types/Habit'

export const HabitContext = createContext(null)

const HabitContextWrapper = ({ children }) => {
  const [habits, setHabits] = useState<Habit[] | null>(null)

  const contextValues = {
    habits,
    setHabits
  }
  return (
    <HabitContext.Provider value={contextValues}>{children}</HabitContext.Provider>
  )
}

export default HabitContextWrapper