import { Habit } from "./Habit"
import { User } from "./User"

export type Group = {
  _id: string,
  name: string,
  description: string,
  admin: {
    username: string,
    email: string
  },
  habits: Habit[],
  members: User[]
}