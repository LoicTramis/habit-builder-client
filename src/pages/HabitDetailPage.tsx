/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import { Habit } from '../types/Habit'
import { useParams } from 'react-router-dom'
import service from '../service/api'
import HabitCard from '../components/HabitCard'

const HabitDetailPage = () => {
  const [habit, setHabit] = useState<Habit | null>(null)
  const { habitId } = useParams()

  const fetchHabit = async () => {
    try {
      const response = await service.get(`/api/habits/${habitId}`)
      setHabit(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchHabit()
  }, [habitId])

  if (!habit) {
    return <Main title="Habit Detail">
      <p>Loading</p>
    </Main>
  }

  return (
    <Main title="Habit Detail">
      <HabitCard {...habit[0]} />
    </Main>
  )
}

export default HabitDetailPage