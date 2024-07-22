import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import service from '../service/api'
import { BuilderContext } from '../context/BuilderContextWrapper'

const Aside = () => {
  const { setHabits, setGroups } = useContext(BuilderContext)

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
  }, []);

  return (
    <aside className='w-1/6 h-full overflow-y-scroll bg-[#f4f4f4]'>
      <Header />
      <Navbar />
      <Footer />
    </aside>
  )
}

export default Aside