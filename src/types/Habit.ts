import { User } from "./User";

export type Habit = {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  frequency: string;
  creator: User;
  difficulty: string;
  members: User[];
};