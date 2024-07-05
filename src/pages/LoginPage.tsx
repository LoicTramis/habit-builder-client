import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContextWrapper'
import { Link } from 'react-router-dom'
import service from '../service/api'

type AuthContextType = {
  user: string,
  storeToken: (token: string) => void,
  removeToken: string,
  authenticateUser: () => void,
  isLoading: boolean,
  isLoggedIn: boolean,
  disconnect?: void,
}


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { storeToken, authenticateUser } = useContext<AuthContextType>(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")
  // const navigate = useNavigate()

  function handleChange(event) {
    const value = event.currentTarget.value
    const key = event.currentTarget.id
    setFormData({ ...formData, [key]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await service.post("/auth/login", formData)
      console.log(response)
      if (response.status === 200) {
        storeToken(response.data.accessToken)
        await authenticateUser()
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message)
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
    }
  }

  const { password, email } = formData
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" value={email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="username">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <p className="error">{errorMessage}</p>

      <p>
        No account? <Link to={"/login"}>Sign up!</Link>
      </p>
      <button>Login</button>
    </form>
  )
}

export default LoginPage