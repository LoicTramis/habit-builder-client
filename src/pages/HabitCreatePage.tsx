import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import { BuilderContext } from "../context/BuilderContextWrapper";
import { Habit } from "../types/Habit";
import service from "../service/api";
import Main from "../components/Main";
import { formatISODateToHTMLDate } from "../utils/date";
import { difficultyColors, difficultyPeerCheckColors } from "../utils/colors";

const today = Date.now();
const oneWeekLater = today + 7 * 1000 * 60 * 60 * 24;

const HabitCreatePage = () => {
  const [habitForm, setHabitForm] = useState({
    title: "",
    description: "",
    startDate: formatISODateToHTMLDate(new Date(today).toISOString()),
    endDate: formatISODateToHTMLDate(new Date(oneWeekLater).toISOString()),
    frequency: "",
    difficulty: "",
  });
  const authenticateUser = useContext(AuthContext);
  const { setHabits } = useContext(BuilderContext);
  const navigate = useNavigate();

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    /* Explaination:
      'event.target' here is an HTMLElement which is the parent of all HTML elements, but isn't guaranteed to have the 'value' property.
      TypeScript detects this and throws the error.
      Cast event.target to the appropriate HTML element to ensure it is an HTMLInputElement which does have a 'value' property.
    */
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;

    setHabitForm((prevHabitForm) => ({
      ...prevHabitForm,
      [name]: value,
    }));

    console.log(habitForm);
    console.log(event.type);
    console.log((event.target as HTMLInputElement).name);
    console.log((event.target as HTMLInputElement).value);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await service.post("api/habits", habitForm);
      const createdHabit: Habit = response.data;

      setHabits((prevHabits: Habit[]) => [...prevHabits, createdHabit]);

      setTimeout(() => {
        navigate(`/habits/${createdHabit._id}`);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  if (!authenticateUser.isLoggedIn) {
    return <p>Log in to create a habit</p>;
  }

  return (
    <Main title="Add a habit">
      <form onSubmit={handleSubmitForm} className="mx-auto flex w-2/3 justify-center">
        <fieldset className="w-full">
          <legend className="text-center text-xl font-bold">What change do you want to make?</legend>

          <label htmlFor="title" className="mt-10 flex flex-col">
            Title
            <input
              type="text"
              name="title"
              id="title"
              value={habitForm.title}
              onChange={handleChange}
              required
              className="rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold"
            />
          </label>

          <label htmlFor="description" className="mt-10 flex flex-col">
            Description
            <textarea
              name="description"
              id="description"
              value={habitForm.description}
              onChange={handleChange}
              rows={5}
              required
              className="my-2 w-full rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold"></textarea>
          </label>

          <label htmlFor="startDate" className="mt-10 flex flex-col">
            Start date
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={habitForm.startDate}
              onChange={handleChange}
              className="text-lg font-bold"
            />
          </label>

          <label htmlFor="endDate" className="mt-10 flex flex-col">
            End date
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={habitForm.endDate}
              onChange={handleChange}
              className="text-lg font-bold"></input>
          </label>

          <label htmlFor="frequency" className="mt-10 flex flex-col">
            Frequency
            <input
              type="text"
              name="frequency"
              id="frequency"
              value={habitForm.frequency}
              onChange={handleChange}
              required
              className="rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold"
            />
          </label>

          <label htmlFor="difficulty" className="mt-10 flex flex-col">
            Difficulty
            <section className="grid grid-cols-5 items-center gap-3">
              {/* Articles separate inputs from each other for peer-checking */}
              <article className="flex justify-center text-center">
                <input
                  type="radio"
                  name="difficulty"
                  id="Easy"
                  value="Easy"
                  onChange={handleChange}
                  className="peer hidden"
                  defaultChecked={true}
                />
                <label
                  htmlFor="Easy"
                  className={`w-full cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold ${difficultyPeerCheckColors["Easy"]}`}>
                  Easy
                </label>
              </article>
              <article className="flex justify-center text-center">
                <input type="radio" name="difficulty" id="Medium" value="Medium" onChange={handleChange} className="peer hidden" />
                <label
                  htmlFor="Medium"
                  className={`w-full cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold ${difficultyPeerCheckColors["Medium"]}`}>
                  Medium
                </label>
              </article>
              <article className="flex justify-center text-center">
                <input type="radio" name="difficulty" id="Hard" value="Hard" onChange={handleChange} className="peer hidden" />
                <label
                  htmlFor="Hard"
                  className={`w-full cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold ${difficultyPeerCheckColors["Hard"]}`}>
                  Hard
                </label>
              </article>
              <article className="flex justify-center text-center">
                <input type="radio" name="difficulty" id="Challenger" value="Challenger" onChange={handleChange} className="peer hidden" />
                <label
                  htmlFor="Challenger"
                  className={`w-full cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold ${difficultyPeerCheckColors["Challenger"]}`}>
                  Challenger
                </label>
              </article>
              <article className="flex justify-center text-center">
                <input type="radio" name="difficulty" id="Goggins" value="Goggins" onChange={handleChange} className="peer hidden" />
                <label
                  htmlFor="Goggins"
                  className={`w-full cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-5 py-3 text-lg font-bold ${difficultyPeerCheckColors["Goggins"]}`}>
                  Goggins
                </label>
              </article>
            </section>
          </label>

          <button
            type="submit"
            className="mt-10 flex rounded border border-green-500 bg-green-500 bg-opacity-70 p-2 text-lg font-bold text-neutral-800 hover:bg-opacity-100">
            Create a new habit
          </button>
        </fieldset>
      </form>
    </Main>
  );
};

export default HabitCreatePage;
