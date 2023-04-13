import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginDropDown from '../LoginDropDown';
import Search from '../Search';
import logo from '../../assets/logo/logo.png';
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
          <div className="logo-name">airbcb</div>
        </div>
      </NavLink>

      {/* <div>
        <h4>Search bar</h4>
      </div> */}
      
      {/* <form className="search-bar">
        <input className="search-bar" type="text" placeholder="Search"/>
        <button className="search-button">
          <img className="search-icon" src="icons/search.svg">
          <div className="tooltip">Search</div>
        </button>
      </form> */}

      {/* <Search /> */}

      <div className="site-header-right-side">
        <div className="session-links">
          {sessionLinks}
        </div>

        <div>
          <a className = 'github-link' href="https://github.com/olga-bessonova/BunnyHop">
            <i className="fa-brands fa-github fa-2x"></i>
          </a>
          <a className = 'linkedin-link' href="https://www.linkedin.com/in/olga-borovikova/">
            <i className="fa-brands fa-linkedin-in fa-2x"></i>
          </a>
        </div>
      </div>
      

    </header>
  );
}

export default Navigation;
