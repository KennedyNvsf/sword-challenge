import React from 'react';
import Head from 'next/head';
import { useStateContext } from '../../context/StateContext';
import {Navbar, Footer} from "../";

const Layout = ({children}) => {

  const {darkMode} = useStateContext();
  
  return (

    <div 
      className="layout"
      style={{ backgroundColor: darkMode? '#171717': '#FAFAFA' }}
    >
      <Head>
        <title>SwordNews</title>
      </Head>

      <header>
        <Navbar/>
      </header>

      <main className="main-container">
       {children}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout;
