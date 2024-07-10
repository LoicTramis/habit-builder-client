import { Route, Routes } from 'react-router-dom'
import './App.css'
import Aside from './components/Aside'
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage'
import HabitPage from './pages/HabitPage'
import HabitUserPage from './pages/HabitUserPage.tsx'
import HabitCreatePage from './pages/HabitCreatePage'
import GroupsPage from './pages/GroupsPage'
import GroupPage from './pages/GroupPage'
import GroupUserPage from './pages/GroupUserPage.tsx'
import GroupCreatePage from './pages/GroupCreatePage'

// ? For improvement
// https://blog.logrocket.com/building-react-modal-module-with-react-router/

function App() {

  return (
    <>
      <Aside />

      <Routes>
        {/* HOME ROUTE */}
        <Route path="/" element={<HomePage />} />

        {/* HABITS ROUTE */}
        <Route path="/habits">
          <Route index element={<HabitsPage />} />
          <Route path="in" element={<HabitUserPage />} />
          <Route path=":habitId" element={<HabitPage />} />
        </Route>
        <Route path='/createHabit' element={<HabitCreatePage />} />

        {/* GROUPS ROUTE */}
        <Route path="/groups">
          <Route index element={<GroupsPage />} />
          <Route path="in" element={<GroupUserPage />} />
          <Route path=":groupId" element={<GroupPage />} />
        </Route>
        <Route path='/createGroup' element={<GroupCreatePage />} />
      </Routes>
    </>
  )
}

export default App
