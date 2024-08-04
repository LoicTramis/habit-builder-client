import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuilderContext } from "../context/BuilderContextWrapper";
import { monthNames, simpleFormatDate } from "../utils/date";
import { User } from "../types/User";
import { Habit } from "../types/Habit";
import service from "../service/api";
import DateIcon from "./icons/DateIcon";
import UserIcon from "./icons/UserIcon";
import JoinIcon from "./icons/JoinIcon";
import HabitForm from "./HabitForm";
import HabitContent from "./HabitContent";

const colors = [
  ["text-blue-400 bg-blue-300", "#60a5fa"],
  ["-translate-x-3 text-red-400 bg-red-300", "#f87171"],
  ["-translate-x-6 text-emerald-400 bg-emerald-300", "#34d399"],
  ["-translate-x-9 text-yellow-400 bg-yellow-300", "#facc15"],
  ["-translate-x-12 text-lime-400 bg-lime-300", "#a3e635"],
  ["-translate-x-15 text-red-400 bg-red-300", "#34d399"],
];
const today = new Date();

const HabitCard = ({ _id, title, creator, difficulty, description, startDate, endDate, frequency, members, detailed = false }) => {
  const [editMode, setEditMode] = useState(false);
  const [habitForm, setHabitForm] = useState({
    description,
    frequency,
    difficulty,
    startDate,
    endDate,
  });
  const { habits, setHabits } = useContext(BuilderContext);
  const navigate = useNavigate();

  ////                           ////
  // *          HANDLES          * //
  ////                           ////
  const handleDelete = async () => {
    const deletedHabit = await service.delete(`/api/habits/${_id}`);
    console.log(deletedHabit);
    const newHabits = habits.filter((habit: Habit) => habit._id !== _id);
    setHabits(newHabits);
  };
  const handleEdit = async () => {
    setEditMode(true);
  };
  const handleCancel = () => {
    setEditMode(false);
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;

    setHabitForm((prevHabitForm) => ({
      ...prevHabitForm,
      [name]: value,
    }));
  };
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await service.put(`/api/habits/${_id}`, habitForm);
      const updatedHabits = habits.map((habit: Habit) => {
        if (habit._id === response.data._id) {
          return response.data;
        }
        return habit;
      });
      // console.log(updatedHabits)
      setHabits(updatedHabits);
    } catch (error) {
      console.log(error);
    } finally {
      setEditMode(false);
    }
  };
  const handleView = (event) => {
    event.preventDefault();
    navigate(`/habits/${_id}`);
  };
  const handleJoin = async () => {
    await service.patch(`/api/habits/add/${_id}`);

    setTimeout(() => {
      navigate("/habits/in");
      // TODO: and display a message somewhere too
    }, 300);
  };
  const handleLeave = async () => {
    await service.patch(`/api/habits/remove/${_id}`);

    setTimeout(() => {
      navigate("/habits/in");
      // TODO: and display a message somewhere too
    }, 300);
  };

  ////                       ////
  // *          JSX          * //
  ////                       ////
  const habitContentJSX = () => {
    if (detailed) {
      if (editMode) {
        return (
          <HabitForm
            habitForm={habitForm}
            members={members}
            creator={creator}
            startDate={startDate}
            endDate={endDate}
            monthNames={monthNames}
            handleSubmitForm={handleSubmitForm}
            handleChange={handleChange}
            handleCancel={handleCancel}
          />
        );
      }
      return (
        <HabitContent
          _id={_id}
          description={description}
          difficulty={difficulty}
          frequency={frequency}
          members={members}
          creator={creator}
          startDate={startDate}
          endDate={endDate}
          monthNames={monthNames}
          handleJoin={handleJoin}
          handleLeave={handleLeave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    } else {
      return (
        <>
          <article className="flex flex-row gap-3">
            <p className="flex items-end gap-2 rounded bg-neutral-100 px-2 py-1">
              <DateIcon />
              {simpleFormatDate(startDate)} - {simpleFormatDate(endDate)}
            </p>
            {difficulty === "Easy" && <p className="rounded-md bg-emerald-200 px-2 py-1 text-emerald-800">{difficulty}</p>}
            {difficulty === "Medium" && <p className="rounded-md bg-orange-200 px-2 py-1 text-orange-800">{difficulty}</p>}
            {difficulty === "Hard" && <p className="rounded-md bg-red-200 px-2 py-1 text-red-800">{difficulty}</p>}
            {difficulty === "Challenger" && <p className="rounded-md bg-purple-200 px-2 py-1 text-purple-800">{difficulty}</p>}
            {difficulty === "Goggins" && <p className="rounded-md bg-neutral-200 px-2 py-1 text-neutral-800">{difficulty}</p>}
          </article>

          <article className="m-2 text-left">
            <p>{description}</p>
          </article>

          <article className="mt-7 flex w-full items-center justify-between">
            <section className="flex items-center">
              {members.map(
                (member: User, index: number) =>
                  index < 3 && (
                    <div key={index} className={`rounded-[50%] border-2 border-[#f6f6f6] p-1 ${colors[index][0]}`}>
                      <UserIcon stroke={colors[index][1]} fill={colors[index][1]} />
                    </div>
                  ),
              )}
              {members.length === 0 && <p> 0 participant</p>}
              {members.length > 3 && <p className="-translate-x-4">+ {members.length - 3} participants</p>}
            </section>
            <section>
              <button id="join" onClick={handleView} className="mr-3 flex gap-1 rounded border border-sky-500 bg-sky-50 px-3 py-1">
                <p className="font-bold text-sky-600">View</p>
                <JoinIcon color="#0369a1" />
              </button>
            </section>
          </article>
        </>
      );
    }
  };

  return (
    <li key={_id} className="flex h-fit w-full basis-1/3 flex-col items-start justify-around gap-3 rounded-xl border-2 bg-white p-3">
      <h3 className="flex flex-row items-center text-lg font-bold text-neutral-950">{title}</h3>
      {habitContentJSX()}
    </li>
  );
};

export default HabitCard;
