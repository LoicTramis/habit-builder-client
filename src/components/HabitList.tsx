import HabitCard from './HabitCard'
import { Habit } from '../types/Habit'

const HabitList = ({ habits, status }) => {
  const habitsJSX = habits.map((habit: Habit) => <HabitCard key={habit._id} {...habit} />)

  return (
    <article>
      <h3>{status}</h3>
      <ul>
        {habitsJSX}
      </ul>
    </article>
  )
}

export default HabitList