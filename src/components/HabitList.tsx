import HabitCard from "./HabitCard";
import { Habit } from "../types/Habit";

const HabitList = ({ habits, title }) => {
  const habitsJSX = habits.map((habit: Habit, index: number) => <HabitCard key={habit._id} {...habit} />);

  return (
    <article className="flex flex-col items-center text-center">
      <h2 className="my-3">{title}</h2>
      {habits.length === 0 ? (
        <h3 className="grid h-[80vh] w-4/5 items-center justify-center rounded-xl border-2 bg-neutral-50 text-[#c7c7c7]">No habits</h3>
      ) : (
        <ul className="grid w-4/5 grid-cols-1 items-center gap-5">{habitsJSX}</ul>
      )}
    </article>
  );
};

export default HabitList;
