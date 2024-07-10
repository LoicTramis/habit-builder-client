import { useEffect, useState } from 'react'
import { Group } from '../types/Group'
import service from '../service/api'
import GroupList from '../components/GroupList'

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
    return <p>Loading...</p>
  }

  return (
    <main>
      <h2>Groups</h2>
      <section>
        <GroupList groups={groups} />
      </section>
    </main>
  )
}

export default GroupUserPage