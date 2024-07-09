export type Group = {
  _id: string,
  name: string,
  description: string,
  admin: {
    username: string,
    email: string
  },
  habits: string[],
  members: string[]
}