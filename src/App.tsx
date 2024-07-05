import { Route, Routes } from 'react-router-dom'
import './App.css'
import Aside from './components/Aside'
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage'
import HabitPage from './pages/HabitPage'
import GroupsPage from './pages/GroupsPage'
import GroupPage from './pages/GroupPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <Aside />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/habits" element={<HabitsPage />}>
          <Route path=":habitId" element={<HabitPage />} />
        </Route>
        <Route path="/groups" element={<GroupsPage />}>
          <Route path=":groupId" element={<GroupPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
