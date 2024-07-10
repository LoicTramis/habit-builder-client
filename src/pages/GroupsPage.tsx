import { useContext, useEffect, useState } from 'react'
import GroupList from '../components/GroupList'
import service from '../service/api'
import { AuthContext } from '../context/AuthContextWrapper'
import { Group } from '../types/Group'
import Main from '../components/Main'

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[] | null>(null)
  const authenticateUser = useContext(AuthContext);

  const fetchGroups = async () => {
    try {
      const response = await service.get("/api/groups")
      setGroups(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchGroups()
  }, [])

  if (!groups) {
    return <p>Loading...</p>
  }

  return (
    <Main title="Explore groups">
      <section>
        <GroupList groups={groups} />
      </section>
    </Main>
  )
}

export default GroupsPage