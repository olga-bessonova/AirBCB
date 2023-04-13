import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  let photoLink = '';
  const togglePhotoLink = () => {
    if (user.photoUrl) {
      photoLink = user.photoUrl
    } else {
      photoLink = 'https://airbbc-dev.s3.amazonaws.com/avatar/user1.jpg'
    };
    return photoLink
  }


  return (
    <div className='profile-button'>
      <button onClick={openMenu} className='profile-icon'>
        {/* <i className="fa-solid fa-user-circle" /> */}
        <img className="profile-avatar" src={togglePhotoLink()} alt=""/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName}</li>
          <li>
            <button onClick={logout}  className="button">Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
