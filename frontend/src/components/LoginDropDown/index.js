import React, { useState, useEffect} from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from '../SignUpModal/SignupForm';
import './LoginForm.css';
import { useSelector } from 'react-redux';

function LoginDropDown({setShowLoginModal, showLoginModal, setLoginMessage}) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const user = useSelector(({session}) => session.user)
  const toggleMenu = () => {
    setMenu(open => !open);
  };
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = () => {
      setMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu]);

  return (
    <>
      <button className='profile-button' onClick={toggleMenu}>
        <i id="profile-button-bars" className="fa-solid fa-bars"></i>
        <i id="profile-button-user-circle" className="fa-regular fa-user-circle" />
      </button>

      {menu && (
          <ul className="profile-dropdown-login" onClick={() => setMenu(false)}>
              <li className="profile_dropdown_li" onClick={()=> setShowLoginModal(true)}>Log in</li>
              <li className="profile_dropdown_li" onClick={()=> setShowSignupModal(true)}>Sign up</li>
              {/* <li className='dropdown-divider'></li> */}
              {/* <li className="profile_dropdown_li" onClick={()=> setShowLoginModal(true)}>airbcb your home</li> */}
              {/* <li onClick={()=> setShowLoginModal(true)}>Account</li> */}
          </ul>
      )}

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} setLoginMessage={setLoginMessage}/>
        </Modal>
      )}
      {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
          <SignUpForm setShowSignupModal={setShowSignupModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginDropDown;