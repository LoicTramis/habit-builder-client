import HabitCard from './HabitCard'
import { Habit } from '../types/Habit'

const HabitList = ({ habits, title }) => {
  const habitsJSX = habits.map((habit: Habit, index: number) => (
    <HabitCard key={habit._id} {...habit} />
  ))

  return (
    <article className='flex flex-col text-center items-center'>
      <h2 className='my-3'>{title}</h2>
      <ul className='grid grid-cols-1 gap-5 w-4/5 items-center'>
        {habitsJSX}
      </ul>
    </article>
  )
}

export default HabitList