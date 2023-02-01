import React from 'react'
import {GoogleOAuthProvider} from "@react-oauth/google";
import { StateContext } from '../context/StateContext';
import '../styles/globals.scss'
import { Layout } from '../components'

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`}
    >
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </GoogleOAuthProvider>
  )
}
