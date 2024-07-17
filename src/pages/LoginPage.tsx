import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContextWrapper'
import service from '../service/api'

type AuthContextType = {
  user: string,
  storeToken: (token: string) => void,
  removeToken: string,
  authenticateUser: () => void,
  isLoading: boolean,
  isLoggedIn: boolean,
  disconnect: () => void,
}


const LoginPage = ({ modal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { storeToken, authenticateUser } = useContext<AuthContextType>(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    const key = event.currentTarget.id
    setFormData({ ...formData, [key]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await service.post("/auth/login", formData)
      if (response.status === 200) {
        storeToken(response.data.authToken)
        await authenticateUser()
      }
      modal.current.close()
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => {
        setErrorMessage("")
      }, 4000)
    }
  }

  const { password, email } = formData

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='flex flex-col gap-5'>
        <legend className='font-bold text-2xl my-5'>Log in</legend>

        <section className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            className='p-2 border-2 border-neutral-200 rounded'
          />
        </section>

        <section className='flex flex-col'>
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            className='p-2 border-2 border-neutral-200 rounded'
          />
        </section>

        <p className="error">{errorMessage}</p>

        <button className='p-2 rounded bg-blue-600 text-lg text-white'>Log in</button>
      </fieldset>
    </form>
  )
}

export default LoginPage