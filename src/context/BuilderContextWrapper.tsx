import { createContext, useState } from 'react'
import { Habit } from '../types/Habit'
import { Group } from '../types/Group'

export const BuilderContext = createContext(null)

const BuilderContextWrapper = ({ children }) => {
  const [habits, setHabits] = useState<Habit[] | null>(null)
  const [groups, setGroups] = useState<Group[] | null>(null)

  const contextValues = {
    habits,
    setHabits,
    groups,
    setGroups
  }
  return (
    <BuilderContext.Provider value={contextValues}>{children}</BuilderContext.Provider>
  )
}

export default BuilderContextWrapper