import { useEffect, useState } from 'react'
import { Group } from '../types/Group'
import service from '../service/api'
import GroupList from '../components/GroupList'
import Main from '../components/Main'

const GroupUserPage = () => {
  const [groups, setGroups] = useState<Group | null>(null)

  const fetchGroups = async () => {
    try {
      const response = await service.get("/api/groups/in")
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
    <Main title="My groups">
      <section>
        <GroupList groups={groups} title="" />
      </section>
    </Main>
  )
}

export default GroupUserPage