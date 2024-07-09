import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextWrapper'
import service from '../service/api'

type Habit = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
  difficulty: string;
};

const HabitCreatePage = () => {
  const [habitForm, setHabitForm] = useState<Habit>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    frequency: "",
    difficulty: ""
  })

  const authenticateUser = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    /* Explaination:
    event.target here is an HTMLElement which is the parent of all HTML elements, but isn't guaranteed to have the property value.
    TypeScript detects this and throws the error. Cast event.target to the appropriate HTML element
    to ensure it is HTMLInputElement which does have a value propert
    */
    const name = (event.target as HTMLInputElement).name
    const value = (event.target as HTMLInputElement).value

    setHabitForm((prevHabitForm) => ({
      ...prevHabitForm,
      [name]: value
    }))
  }

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await service.post('api/habits', habitForm)
    console.log(response.data)
    setTimeout(() => {
      // TODO 
      // Don't use navigate
      // Make a pop up that show the form
      // Then success or not show option to navigate
      navigate('/habits')
    }, 300)
  }

  if (!authenticateUser.isLoggedIn) {
    return <p>Log in to create a habit</p>
  }

  return (
    <form onSubmit={handleSubmitForm}>

      <fieldset>
        <legend>Create a habit</legend>

        <label htmlFor='title'>Title</label>
        <input type="text" name="title" id="title" value={habitForm.title} onChange={handleChange} />

        <label htmlFor='description'>Description</label>
        <textarea name="description" id="description" value={habitForm.description} onChange={handleChange}></textarea>

        <label htmlFor='startDate'>Start date</label>
        <input type='date' name="startDate" id="startDate" value={habitForm.startDate} onChange={handleChange}></input>

        <label htmlFor='endDate'>End date</label>
        <input type='date' name="endDate" id="endDate" value={habitForm.endDate} onChange={handleChange}></input>

        <label htmlFor='frequency'>Frequency</label>
        <input type="text" name="frequency" id="frequency" value={habitForm.frequency} onChange={handleChange} />

        <label htmlFor='difficulty'>Difficulty</label>
        <select name="difficulty" id="difficulty" value={habitForm.difficulty} onChange={handleChange}>
          <option value="-1">-- Select a difficulty --</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Challenger">Challenger</option>
          <option value="Goggins">Goggins</option>
        </select>

        <button type="submit">Create habit</button>
      </fieldset>
    </form>
  )
}

export default HabitCreatePage