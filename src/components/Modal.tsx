import React, { useRef } from 'react'
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';

const Modal = ({ modal, showPage, setShowPage }) => {

  const handleSwitchModal = () => {
    setShowPage(!showPage);
  };

  return (
    <dialog ref={modal} className="rounded-lg w-1/3 p-5">
      {showPage ? (
        <>
          <SignupPage modal={modal} showPage={showPage} setShowPage={setShowPage} />
          <p className="mt-5 flex gap-4 justify-end">
            Already have an account? <button onClick={handleSwitchModal} className="text-blue-500 underline">Login.</button>
          </p>
        </>
      ) : (
        <>
          <LoginPage modal={modal} />
          <p className="mt-5 flex gap-4 justify-end">
            No account? <button onClick={handleSwitchModal} className="text-blue-500 underline">Sign up!</button>
          </p>
        </>
      )}
    </dialog>
  )
}

export default Modal