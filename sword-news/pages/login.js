import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {GoogleLogin} from "@react-oauth/google";
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';


const loginPage = () => {

  const {addUser} = useAuthStore();
  const navigate = useRouter();

  const handleLogAuth = ( response) => {
    createOrGetUser(response, addUser)
    navigate.push('/');
  }

  return (
     <div className="auth-wrapper">
      <div className="auth-container">
        
        <h2>Login</h2>
        <p >Login and start reading our blog posts</p>
        
        <GoogleLogin
          onSuccess={(response) => handleLogAuth(response)}
          onError={() => console.log('error')}
        />
      </div>
    </div>
  )
}

export default loginPage;
