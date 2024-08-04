import React, { useContext, useState } from "react";
import DifficultyIcon from "./icons/DifficultyIcon";
import FrequencyIcon from "./icons/FrequencyIcon";
import DateIcon from "./icons/DateIcon";
import DescriptionIcon from "./icons/DescriptionIcon";
import GroupIcon from "./icons/GroupIcon";
import { AuthContext } from "../context/AuthContextWrapper";
import SaveIcon from "./icons/SaveIcon";
import CancelIcon from "./icons/CancelIcon";
import getCalendar from "../utils/calendar";
import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";
import { formatISODateToHTMLDate } from "../utils/date";

const HabitForm = ({ habitForm, members, creator, startDate, endDate, monthNames, handleSubmitForm, handleChange, handleCancel }) => {
  const [startDay, setStartDay] = useState(new Date(startDate));
  const [endDay, setEndDay] = useState(new Date(endDate));
  const [calendarMonth, setCalendarMonth] = useState(startDay.getMonth());
  const authenticateUser = useContext(AuthContext);

  const handleSideMonth = (event, side: string) => {
    event.preventDefault();
    if (side === "previous") {
      setCalendarMonth((prev) => prev - 1);
      // setStartDay(prev => new Date(prev.getMonth() - 1))
    } else {
      setCalendarMonth((prev) => prev + 1);
      // setStartDay(prev => new Date(prev.getMonth() + 1))
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} className="flex w-full justify-between">
        {/* ////                           //// */}
        {/* // *        Description        * // */}
        {/* // *   Difficulty & Frenquency * // */}
        {/* // *          Members          * // */}
        {/* ////                           //// */}
        <section className="flex basis-1/3 flex-col">
          <article>
            <p className="flex items-center justify-start gap-2 px-4 pt-2 font-bold text-neutral-950">
              <DescriptionIcon />
              Description
            </p>
            <textarea
              name="description"
              id="description"
              value={habitForm.description}
              onChange={handleChange}
              rows={5}
              className="ml-4 mt-1 w-full rounded border border-neutral-200 px-2 py-1 text-[#060606]"></textarea>
          </article>

          <article className="flex items-center gap-2 px-4 py-2">
            <p className="flex gap-2">
              <DifficultyIcon />
              Difficulty
            </p>
            <select
              name="difficulty"
              id="difficulty"
              value={habitForm.difficulty}
              onChange={handleChange}
              className="x-2 col-span-2 rounded border border-neutral-200 py-1 text-[#060606]">
              <option value="-1" className="px-2 py-1">
                -- Select a difficulty --
              </option>
              <option value="Easy" className="bg-emerald-200 px-2 py-1 text-emerald-800">
                Easy
              </option>
              <option value="Medium" className="bg-orange-200 px-2 py-1 text-orange-800">
                Medium
              </option>
              <option value="Hard" className="bg-red-200 px-2 py-1 text-red-800">
                Hard
              </option>
              <option value="Challenger" className="bg-purple-200 px-2 py-1 text-purple-800">
                Challenger
              </option>
              <option value="Goggins" className="bg-neutral-600 px-2 py-1 text-neutral-200">
                Goggins
              </option>
            </select>
          </article>

          <article className="flex items-center gap-2 px-4 py-2">
            <p className="flex gap-2">
              <FrequencyIcon />
              Frequency
            </p>
            <input
              type="text"
              name="frequency"
              id="frequency"
              value={habitForm.frequency}
              onChange={handleChange}
              className="rounded border border-neutral-200 px-2 py-1 text-[#060606]"
            />
          </article>

          <article className="flex gap-2 px-4 py-2">
            <p className="flex gap-2">
              <GroupIcon />
              Members
            </p>
            <p className="text-[#060606]">{members.length} participants</p>
          </article>
        </section>
        {/* ////                           //// */}
        {/* // *        Month & Year       * // */}
        {/* // *          Calendar         * // */}
        {/* ////                           //// */}
        <section className="flex basis-1/3 flex-col">
          <article className="flex flex-col gap-3 px-4 py-2 text-[#707070]">
            <section className="flex flex-row items-center justify-around text-center text-lg font-bold text-neutral-950">
              <button onClick={(e) => handleSideMonth(e, "previous")} className="rounded p-1 hover:bg-neutral-100">
                <ChevronLeft />
              </button>
              <p>
                {monthNames[calendarMonth]} {startDay.getFullYear()}
              </p>
              <button onClick={(e) => handleSideMonth(e, "next")} className="rounded p-1 hover:bg-neutral-100">
                <ChevronRight />
              </button>
            </section>
          </article>

          <article>
            <ul className="col-span-3">
              {getCalendar(startDay.getFullYear(), calendarMonth).map((line: object[], index: number) => (
                <li key={index} className="flex justify-center">
                  <ul className="flex">
                    {line.map((day: Date) => {
                      // CSS: for days
                      // day -> gray, days of months -> black
                      // CSS: side days -> gray, days of months -> black
                      let color = "";
                      if (day.getMonth() === calendarMonth) {
                        color = "text-neutral-950";
                      } else {
                        color = "text-neutral-300";
                      }
                      // CSS: start day
                      if (day.getDate() === startDay.getDate() && day.getMonth() === startDay.getMonth()) {
                        color = " bg-indigo-200 text-indigo-800 border-indigo-300";
                      }
                      // CSS: end day
                      if (day.getDate() === endDay.getDate() && day.getMonth() === endDay.getMonth()) {
                        color = " bg-pink-200 text-pink-800 border-pink-300";
                      }

                      return (
                        <li key={day.getDate()} className={`m-1 h-12 w-12 rounded border p-4 ${color} flex items-center justify-center`}>
                          {day.getDate()}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </article>
        </section>
        {/* ////                           //// */}
        {/* // *      Start & End Date     * // */}
        {/* ////                           //// */}
        <section className="flex basis-1/3 flex-col justify-between">
          <article className="flex items-center gap-2 px-4 py-2 text-[#707070]">
            <p className="flex w-24 gap-2 rounded border border-indigo-300 bg-indigo-200 px-2 py-1 text-indigo-800">
              <DateIcon />
              Start
            </p>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formatISODateToHTMLDate(habitForm.startDate)}
              onChange={handleChange}
              className="col-span-2 rounded border border-neutral-200 px-2 py-1 text-[#060606]"
            />
          </article>
          <article className="flex items-center gap-2 px-4 py-2 text-[#707070]">
            <p className="flex w-24 gap-2 rounded border border-pink-300 bg-pink-200 px-2 py-1 text-pink-800">
              <DateIcon />
              End
            </p>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={formatISODateToHTMLDate(habitForm.endDate)}
              onChange={handleChange}
              className="col-span-2 rounded border border-neutral-200 px-2 py-1 text-[#060606]"
            />
          </article>
        </section>
      </form>
      {authenticateUser.isLoggedIn && authenticateUser.user._id === creator._id && (
        <article className="flex w-full justify-between">
          <button
            type="reset"
            onClick={handleCancel}
            className="m-3 flex items-start gap-1 p-2 font-bold text-zinc-500 opacity-70 hover:opacity-100">
            <CancelIcon size={"size-5"} />
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmitForm}
            className="m-3 flex items-start gap-1 p-2 font-bold text-emerald-500 opacity-70 hover:opacity-100">
            <SaveIcon size={"size-5"} />
            Save
          </button>
        </article>
      )}
    </>
  );
};

export default HabitForm;
