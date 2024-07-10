import React, { useContext, useState } from 'react'
import { Group } from '../types/Group'
import Main from '../components/Main'
import { AuthContext } from '../context/AuthContextWrapper'
import { useNavigate } from 'react-router-dom'
import service from '../service/api'

const GroupCreatePage = () => {
  const [groupForm, setGroupForm] = useState<Group | any>({
    name: "",
    description: "",
    admin: {
      username: "",
      email: "",
    },
    habits: [],
    members: []
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

    setGroupForm((prevGroupForm: Group) => ({
      ...prevGroupForm,
      [name]: value
    }))
  }

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await service.post('api/groups', groupForm)
      console.log(response.data)
      setTimeout(() => {
        // TODO 
        // Don't use navigate
        // Make a pop up that show the form
        // Then success or not show option to navigate
        navigate('/groups')
      }, 300)
    } catch (error) {
      console.log(error)
    }
  }

  if (!authenticateUser.isLoggedIn) {
    return <p>Log in to create a habit</p>
  }

  return (
    <Main title="Create a group">
      <form onSubmit={handleSubmitForm}>
        <fieldset>
          <legend>Provide details for the group</legend>

          <label htmlFor="name">Name</label>
          <input type="text" name='name' id='name' value={groupForm.name} onChange={handleChange} />

          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={groupForm.description} onChange={handleChange}></textarea>

          <label htmlFor='habits'>Habits</label>
          <select name="habits" id="habits" value={groupForm.habits} onChange={handleChange} multiple>
            <option value="-1">-- Select habits --</option>
            <option value="o">-- Select habits --</option>
          </select>

          <label htmlFor='members'>Members</label>
          <select name="members" id="members" value={groupForm.members} onChange={handleChange} multiple>
            <option value="-1">-- Select members --</option>
            <option value="o">-- Select members --</option>
          </select>

        </fieldset>
      </form>
    </Main>
  )
}

export default GroupCreatePage