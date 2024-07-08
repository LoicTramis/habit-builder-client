import { useState } from "react"
import service from "./../service/api"

const SignupPage = ({ modal, showPage, setShowPage }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(event) {
    const value = event.currentTarget.value
    const key = event.currentTarget.id
    setFormData({ ...formData, [key]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await service.post("/auth/signup", formData)
      if (response.status === 201) {
        setTimeout(() => {
          modal.current.close()
          setShowPage(!showPage)
          modal.current.showModal()
        }, 200)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage("")
      }, 4000)
    }
  }

  const { username, password, email } = formData
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>SIGN UP</legend>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
          />
        </div>
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


        <button>Sign up</button>
      </fieldset>
    </form>
  )
}

export default SignupPage