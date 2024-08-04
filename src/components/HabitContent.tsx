import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { User } from "../types/User";
import GroupIcon from "./icons/GroupIcon";
import DescriptionIcon from "./icons/DescriptionIcon";
import getCalendar from "../utils/calendar";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { formatDate } from "../utils/date";
import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";
import DateIcon from "./icons/DateIcon";

const HabitContent = (props) => {
  const [startDay, setStartDay] = useState(new Date(props.startDate));
  const [endDay, setEndDay] = useState(new Date(props.endDate));
  const [calendarMonth, setCalendarMonth] = useState(startDay.getMonth());
  const authenticateUser = useContext(AuthContext);

  const handleSideMonth = (side: string) => {
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
      <article className="flex w-full justify-between">
        {/* ////                                 //// */}
        {/* // *           Description           * // */}
        {/* // *      Difficulty & Frenquency    * // */}
        {/* // *             Members             * // */}
        {/* ////                                 //// */}
        <section className="flex basis-1/3 flex-col">
          <article>
            <p className="flex items-center justify-start gap-2 px-4 pt-2 font-bold text-neutral-950">
              <DescriptionIcon />
              Description
            </p>
            <p className="ml-4 mt-1 h-36 w-[90%] rounded border border-transparent px-2 py-1">{props.description}</p>
          </article>

          <article className="flex gap-2 px-4 py-2">
            {props.difficulty === "Easy" && <p className="rounded-md bg-emerald-200 px-2 py-1 text-emerald-800">{props.difficulty}</p>}
            {props.difficulty === "Medium" && <p className="rounded-md bg-orange-200 px-2 py-1 text-orange-800">{props.difficulty}</p>}
            {props.difficulty === "Hard" && <p className="rounded-md bg-red-200 px-2 py-1 text-red-800">{props.difficulty}</p>}
            {props.difficulty === "Challenger" && <p className="rounded-md bg-purple-200 px-2 py-1 text-purple-800">{props.difficulty}</p>}
            {props.difficulty === "Goggins" && <p className="rounded-md bg-neutral-600 px-2 py-1 text-neutral-200">{props.difficulty}</p>}
            <p className="rounded-md bg-neutral-200 px-2 py-1 text-neutral-800">{props.frequency}</p>
          </article>

          <article className="gap-2 px-4 py-2 font-bold text-neutral-950">
            <p className="flex gap-2">
              <GroupIcon />
              Members
            </p>
            <ul className="flex flex-wrap font-normal">
              <li key={props._id}>{props.creator.username}</li>
              {props.members.map((member: User) => (
                <li key={member._id}>, {member.username}</li>
              ))}
            </ul>
          </article>
        </section>
        {/* ////                                 //// */}
        {/* // *           Month & Year          * // */}
        {/* // *             Calendar            * // */}
        {/* ////                                 //// */}
        <section className="flex basis-1/3 flex-col">
          <article className="flex flex-col gap-3 px-4 py-2 text-[#707070]">
            <section className="flex flex-row items-center justify-around text-center text-lg font-bold text-neutral-950">
              <button onClick={() => handleSideMonth("previous")} className="rounded p-1 hover:bg-neutral-100">
                <ChevronLeft />
              </button>
              <p>
                {props.monthNames[calendarMonth]} {startDay.getFullYear()}
              </p>
              <button onClick={() => handleSideMonth("next")} className="rounded p-1 hover:bg-neutral-100">
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
                      // CSS for day of the month and side months
                      let color = "";
                      if (day.getMonth() === calendarMonth) {
                        color = "text-neutral-950";
                      } else {
                        color = "text-neutral-300";
                      }
                      // CSS for start day number
                      if (day.getDate() === startDay.getDate() && day.getMonth() === startDay.getMonth()) {
                        color = " bg-indigo-200 text-indigo-800 border-indigo-300";
                      }
                      // CSS for end day number
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
        {/* ////                                 //// */}
        {/* // *            Start Date           * // */}
        {/* // *             End Date            * // */}
        {/* ////                                 //// */}
        <section className="flex basis-1/3 flex-col justify-between">
          <article className="flex items-center gap-2 px-4 py-2 text-[#707070]">
            <p className="flex w-24 gap-2 rounded border border-indigo-300 bg-indigo-200 px-2 py-1 text-indigo-800">
              <DateIcon />
              Start
            </p>
            <p className="col-span-2 text-[#060606]">{formatDate(props.startDate)}</p>
          </article>

          <article className="flex items-center gap-2 px-4 py-2 text-[#707070]">
            <p className="flex w-24 gap-2 rounded border border-pink-300 bg-pink-200 px-2 py-1 text-pink-800">
              <DateIcon />
              End
            </p>
            <p className="col-span-2 text-[#060606]">{formatDate(props.endDate)}</p>
          </article>
        </section>
      </article>

      <section className="flex flex-row">
        {authenticateUser.isLoggedIn &&
          (props.members.some((member: User) => member._id === authenticateUser.user._id) || props.creator._id === authenticateUser.user._id) && (
            <article className="flex items-center justify-between">
              <button
                id="join"
                onClick={props.handleLeave}
                className="mr-3 flex h-fit gap-1 rounded border border-red-500 bg-red-50 px-3 py-1 text-red-600">
                <p className="font-bold">Leave habit</p>
              </button>
            </article>
          )}
        {authenticateUser.isLoggedIn &&
          !props.members.find((member: User) => member._id === authenticateUser.user._id) &&
          props.creator._id !== authenticateUser.user._id && (
            <article className="flex justify-between">
              <button id="join" onClick={props.handleJoin} className="mr-3 flex gap-1 rounded border border-sky-500 bg-sky-50 px-3 py-1">
                <p className="font-bold text-sky-600">Join</p>
              </button>
            </article>
          )}
      </section>
      {authenticateUser.isLoggedIn && authenticateUser.user._id === props.creator._id && (
        <article className="flex w-full justify-between">
          <button onClick={props.handleDelete} className="m-3 flex items-start gap-1 p-2 font-bold text-red-500 opacity-70 hover:opacity-100">
            <DeleteIcon size={"size-5"} />
            Delete
          </button>
          <button onClick={props.handleEdit} className="m-3 flex items-start gap-1 p-2 font-bold text-blue-500 opacity-70 hover:opacity-100">
            <EditIcon size={"size-5"} />
            Edit
          </button>
        </article>
      )}
    </>
  );
};

export default HabitContent;
