import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

const Aside = () => {
  return (
    <aside className='w-1/6 bg-cyan-500'>
      <Header />
      <Navbar />
      <Footer />
    </aside>
  )
}

export default Aside