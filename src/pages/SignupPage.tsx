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
      <fieldset className='flex flex-col gap-5'>
        <legend className='font-bold text-2xl my-5'>Sign up</legend>
        <section className='flex flex-col'>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            className='p-2 border-2 border-neutral-200 rounded'
          />
        </section>
        <section className='flex flex-col'>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" value={email} onChange={handleChange}
            className='p-2 border-2 border-neutral-200 rounded'
          />
        </section>
        <section className='flex flex-col'>
          <label htmlFor="username">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            className='p-2 border-2 border-neutral-200 rounded'
          />
        </section>

        <p className="error">{errorMessage}</p>

        <button className='p-2 rounded bg-blue-600 text-lg text-white'>Sign up</button>
      </fieldset>
    </form>
  )
}

export default SignupPage