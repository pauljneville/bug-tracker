import '../styles/globals.css'
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
