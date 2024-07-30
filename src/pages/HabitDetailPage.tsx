/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import Main from '../components/Main'
import { Habit } from '../types/Habit'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../service/api'
import HabitCard from '../components/HabitCard'
import { BuilderContext } from '../context/BuilderContextWrapper'

const HabitDetailPage = () => {
  const [habit, setHabit] = useState<Habit | null>(null)
  const { habits } = useContext(BuilderContext)
  const { habitId } = useParams()
  const navigate = useNavigate()

  const fetchHabit = async () => {
    try {
      const response = await service.get(`/api/habits/${habitId}`)
      if (response.data.length === 0) {
        navigate("/habits/in")
        return
      }
      setHabit(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchHabit()
  }, [habits, habitId])

  if (!habit) {
    return <Main title="Habit Detail">
      <p>Loading</p>
    </Main>
  }

  return (
    <Main title="Habit Detail">
      <HabitCard {...habit[0]} detailed={true} />
    </Main>
  )
}

export default HabitDetailPage