import React from 'react'

const Button = (...parameters) => {

  return (
    <button className='mt-10 p-2 text-lg text-neutral-800 font-bold flex bg-green-500 bg-opacity-70 border border-green-500 rounded hover:bg-opacity-100' {...parameters}>Button</button>
  )
}

export default Button