import React from 'react';
import Link from 'next/link';
import {useStateContext} from '../../context/StateContext';

const Footer = () => {

  const {darkMode} = useStateContext();
  
  return (
    <div className="footer-container">
      <p className="footer-logo">
        <Link href="/">
          <span className="footer-logo-primary-span">Sword</span>
          <span className="footer-logo-secondary-span"  style={{ color: darkMode? 'white': '#1E3861' }}>News</span>
        </Link>
      </p>
      <p style={{ color: darkMode? 'white': '#1E3861' }}>2023 SwordNews All rights reserved</p>
    </div>
  )
}

export default Footer;
