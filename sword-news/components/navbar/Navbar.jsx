import React from 'react';
import Link from 'next/link';
import {useStateContext} from '../../context/StateContext';
import useAuthStore from "../../store/authStore";
import NavDrop from './navdrop/NavDrop';


const NavBar = () => {

  const {userProfile} = useAuthStore();
  const {showDropdown, setShowDropdown, darkMode} = useStateContext();

  return (

    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <span className="logo-primary-span">Sword</span>
          <span 
            className="logo-secondary-span"
            style={{ color: darkMode? 'white': '#1E3861' }}
          >
            News
          </span>
        </Link>
      </p>

      <div  className="nav-item-container">

        {userProfile?.userRole === 'user' && (
          <p className="nav-item">
            Bookmarks
        </p>
        )}

        <p 
          className="nav-item"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Menu
        </p>
        
      </div>

      {showDropdown && <NavDrop/> }
    </div>
  )
}

export default NavBar; 
