import React from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate('/')}
      className='position-fixed left-0 top-0 w-full h-full overflow-y-scroll'>
      <article className='modal' onClick={e => e.stopPropagation()}>
        <p>content</p>
      </article>
    </div>
  )
}

export default Modal