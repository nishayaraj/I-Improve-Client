/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../auth/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>i-improve</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <ViewDirectorBasedOnUserAuthStatus
          component={Component}
          pageProps={pageProps}
        />
      </AuthProvider>
    </>
  );
}

export default MyApp;
