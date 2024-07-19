import { Route, Routes } from 'react-router-dom'
import Aside from './components/Aside'
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage'
import HabitDetailPage from './pages/HabitDetailPage.tsx'
import HabitUserPage from './pages/HabitUserPage.tsx'
import HabitCreatePage from './pages/HabitCreatePage'
import GroupsPage from './pages/GroupsPage'
import GroupPage from './pages/GroupPage'
import GroupUserPage from './pages/GroupUserPage.tsx'
import GroupCreatePage from './pages/GroupCreatePage'
import { useContext, useEffect, useState } from 'react'
import { Group } from './types/Group.ts'
import service from './service/api.ts'
import { HabitContext } from './context/HabitContextWrapper.tsx'

// ? For improvement
// https://blog.logrocket.com/building-react-modal-module-with-react-router/

function App() {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const { habits, setHabits } = useContext(HabitContext)

  const fetchHabits = async () => {
    try {
      const response = await service.get("/api/habits");
      setHabits(response.data);
    } catch (error) {
      // show some error on the screen
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await service.get("/api/groups");
      setGroups(response.data);
    } catch (error) {
      // show some error on the screen
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchGroups();
  }, [habits]);

  /**
   * Put a Route wrapper between the routes and use Outlet
   */
  return (
    <>
      <Aside groups={groups} />

      <Routes>

        {/* HOME ROUTE */}
        <Route path="/" element={<HomePage groups={groups} />} />

        {/* HABITS ROUTE */}
        <Route path="/habits">
          <Route index element={<HabitsPage />} />
          <Route path="in" element={<HabitUserPage />} />
          <Route path=":habitId" element={<HabitDetailPage />} />
        </Route>
        <Route path='/createHabit' element={<HabitCreatePage setHabits={setHabits} />} />

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
