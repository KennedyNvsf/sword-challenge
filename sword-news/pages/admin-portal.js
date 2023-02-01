import React from 'react';
import { useRouter } from 'next/router';
import {GoogleLogin} from "@react-oauth/google";
import { createOrGetAdmin } from '../utils';
import useAuthStore from '../store/authStore';



const adminPortal = () => {

  const {addUser} = useAuthStore();
  const navigate = useRouter();

  const handleAdminAuth = ( response) => {
    createOrGetAdmin(response, addUser)
    navigate.push('/');
  }

  return (
     <div className="auth-wrapper">
      <div className="auth-container">
        
        <h2>Admin Portal</h2>
        <p >Login as an administrator and make changes</p>
        
        <GoogleLogin
          onSuccess={(response) => handleAdminAuth(response)}
          onError={() => console.log('error')}
        />
      </div>
    </div>
  )
}

export default adminPortal ;
