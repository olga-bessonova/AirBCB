import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginButton from './LoginButton';
import logo from './logo.png';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginButton />
        <NavLink to="/signup" className="button">Sign Up</NavLink>
      </>
    );
  }

  return (
    <header className="site-header">
      <NavLink exact to="/" className="nav-title">
        <div>
          <img src={logo} alt="Logo" className="logo-img"/>
          <h3>airbbc</h3>
        </div>
      </NavLink>
      <div className="session-links">
        {sessionLinks}
      </div>
    </header>
  );
}

export default Navigation;
