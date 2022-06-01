import '../styles/globals.css'
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import Navbar from '../components/Navbar';
import TopNav from '../components/TopNav';
import TwoColumn from '../components/TwoColumn';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const router = useRouter();

  return (
    <UserContext.Provider value={userData}>
      <TopNav path={router.asPath} />
      <TwoColumn>
        <Navbar />
        <Component {...pageProps} />
      </TwoColumn>
    </UserContext.Provider>
  );
}

export default MyApp;
