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
    return <Main title=""><p>Loading</p></Main>
  }

  return (
    <Main title="Explore groups">
      <GroupList groups={groups} title="All groups" />
    </Main>
  )
}

export default GroupsPage