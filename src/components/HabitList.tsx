import HabitCard from './HabitCard'
import { Habit } from '../types/Habit'

const HabitList = ({ habits, setHabits, title }) => {
  const habitsJSX = habits.map((habit: Habit, index: number) => <HabitCard key={habit._id} habits={habits} setHabits={setHabits} rank={index + 1} {...habit} />)

  return (
    <article>
      <h2>{title}</h2>
      <ul className='grid grid-cols-3 gap-5 w-full justify-between'>
        {habitsJSX}
      </ul>
    </article>
  )
}

export default HabitList