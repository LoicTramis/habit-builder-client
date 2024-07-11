import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

const Aside = ({ habits, groups }) => {
  return (
    <aside className='w-1/6 h-full overflow-y-scroll bg-[#f4f4f4]'>
      <Header />
      <Navbar habits={habits} groups={groups} />
      <Footer />
    </aside>
  )
}

export default Aside