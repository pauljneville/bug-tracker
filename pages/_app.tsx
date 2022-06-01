import '../styles/globals.css'
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import Navbar from '../components/Navbar';
import TopNav from '../components/TopNav';
import TwoColumn from '../components/TwoColumn';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <TopNav />
      <TwoColumn>
        <Navbar />
        <Component {...pageProps} />
      </TwoColumn>
    </UserContext.Provider>
  );
}

export default MyApp;
