import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import CloseIcon from "./icons/CloseIcon";

const Modal = ({ modal, showPage, setShowPage }) => {
  const handleSwitchModal = () => {
    setShowPage(!showPage);
  };
  const handleClose = () => {
    modal.current.close();
  };

  return (
    <dialog ref={modal} className="w-1/3 rounded-lg p-5">
      <button onClick={handleClose} className="absolute right-3 top-3">
        <CloseIcon />
      </button>
      {showPage ? (
        <>
          <SignupPage modal={modal} showPage={showPage} setShowPage={setShowPage} />
          <p className="mt-5 flex justify-end gap-4">
            Already have an account?{" "}
            <button onClick={handleSwitchModal} className="text-blue-500 underline">
              Login.
            </button>
          </p>
        </>
      ) : (
        <>
          <LoginPage modal={modal} />
          <p className="mt-5 flex justify-end gap-4">
            No account?{" "}
            <button onClick={handleSwitchModal} className="text-blue-500 underline">
              Sign up!
            </button>
          </p>
        </>
      )}
    </dialog>
  );
};

export default Modal;
