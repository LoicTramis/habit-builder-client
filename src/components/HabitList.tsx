import HabitCard from './HabitCard'
import { Habit } from '../types/Habit'

const HabitList = ({ habits, title }) => {
  const habitsJSX = habits.map((habit: Habit, index: number) => <HabitCard key={habit._id} rank={index + 1} {...habit} />)

  return (
    <article>
      <h2>{title}</h2>
      <ul className=' flex w-full justify-between'>
        {habitsJSX}
      </ul>
    </article>
  )
}

export default HabitList