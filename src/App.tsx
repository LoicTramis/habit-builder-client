import { Route, Routes } from 'react-router-dom'
import './App.css'
import Aside from './components/Aside'
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage'
import HabitPage from './pages/HabitPage'
import GroupsPage from './pages/GroupsPage'
import GroupPage from './pages/GroupPage'

// ? For improvement
// https://blog.logrocket.com/building-react-modal-module-with-react-router/

function App() {

  return (
    <>
      <Aside />

      <Routes>
        <Route path="/" element={<HomePage />} />
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
