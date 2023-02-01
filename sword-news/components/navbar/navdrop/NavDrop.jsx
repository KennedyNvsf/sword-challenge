import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {googleLogout} from "@react-oauth/google";
import {useStateContext} from "../../../context/StateContext";
import useAuthStore from "../../../store/authStore";




const NavDrop = () => {

    
    const {userProfile, removeUser} = useAuthStore();
    const navigate = useRouter();
    const {setShowDropdown, setDarkMode, darkMode} = useStateContext();

    const handleLogOut = () => {
        googleLogout()
        removeUser()
        setShowDropdown(false)
        navigate.push('/login');
    }

  return (

    <div className='nav-drop-wrapper'>
        <div className="nav-drop-container">

            <div>

                {userProfile && (
                    <Link href='/create-post'>
                        <div 
                            className="nav-drop-item-container"
                            onClick={() => {
                                setShowDropdown(false)
                            }}
                        >
                            <div className="nav-drop-item-text">
                                <h3>Create Post</h3>
                            </div>
                        </div>
                    </Link>
                )}
                    
                <Link href='/login'>
                    <div 
                        className="nav-drop-item-container"
                        onClick={() => {
                            setShowDropdown(false)
                        }}
                    >
                        <div className="nav-drop-item-text">
                            <h3>Login as user</h3>
                        </div>
                    </div>
                </Link>
                
                
                <Link href='/admin-portal'>
                    <div 
                        className="nav-drop-item-container"
                        onClick={() => {
                            setShowDropdown(false)
                        }}
                    >
                        <div className="nav-drop-item-text">
                            <h3>Admin portal</h3>
                        </div>
                    </div>
                </Link>
                

                {!darkMode ? (
                    <div 
                    className="nav-drop-item-container"
                    onClick={() => {
                        setDarkMode(true)
                        setShowDropdown(false)
                    }}
                >
                    <div className="nav-drop-item-text">
                        <h3>Dark Mode</h3>
                    </div>
                </div>
                ) : (
                    <div 
                    className="nav-drop-item-container"
                    onClick={() => {
                        setDarkMode(false)
                        setShowDropdown(false)
                    }}
                >
                    <div className="nav-drop-item-text">
                        <h3>Light Mode</h3>
                    </div>
                </div>
                )}

                
                {userProfile && (
                    <div 
                        className="nav-drop-item-container"
                        onClick={() => handleLogOut()}
                    >
                        <div className="nav-drop-item-text">
                            <h3>Logout</h3>
                        </div>
                        
                    </div>
                )}

            </div>
          
        </div>
    </div>
  )
}

export default NavDrop;