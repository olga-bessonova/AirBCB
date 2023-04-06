import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginDropDown from '../LoginDropDown';
import logo from './logo.png';
import './Navigation.css';

const Navigation = ({showLoginModal, setShowLoginModal}) => {
  const sessionUser = useSelector(state => state.session.user);
  const [loginMessage, setLoginMessage] = useState(false);


  let messageTimeout;
  useEffect(() => {
    if(loginMessage) {
      messageTimeout = setTimeout(() => {
        setLoginMessage(false);
        clearTimeout(messageTimeout);
      }, 3000)
    }
  },[loginMessage])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <LoginDropDown 
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setLoginMessage={setLoginMessage}
      />
    );
  }

  return (
    <header className="site-header">
      <NavLink className="nav-title" exact to="/" >
        <div className = "logo-box">
          <img className="logo-img" src={logo} alt="Logo"/>
          <div className="logo-name">airbbc</div>
        </div>
      </NavLink>

      <div>
        <h4>Search bar</h4>
      </div>

      <div className="session-links">
        {sessionLinks}
      </div>

    </header>
  );
}

export default Navigation;
