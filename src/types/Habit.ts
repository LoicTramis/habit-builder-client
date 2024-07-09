export type Habit = {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  frequency: string;
  creator: {
    username: string;
    email: string;
  };
  difficulty: string;
  groups: string[];
};