import './App.css'
import { jobAtom, messagingAtom, networkAtom, notificationAtom, totalNotificationCount } from './atoms/atom'
import { useRecoilValue, RecoilRoot } from 'recoil'



function App() {
  return <RecoilRoot>
    <Topbar />
  </RecoilRoot>
}

function Topbar(){
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobAtomCount = useRecoilValue(jobAtom);
  const notificationAtomCount = useRecoilValue(notificationAtom);
  const messagingAtomCount = useRecoilValue(messagingAtom);
  const totalnotifications = useRecoilValue(totalNotificationCount);

  return(
    <>
        <button>Home</button>
        <button>My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})  </button>
        <button>Job ({jobAtomCount >= 100 ? "99+" : jobAtomCount})</button>
        <button>Messages ({messagingAtomCount >= 100 ? "99+" : messagingAtomCount})</button>
        <button>Notifications ({notificationAtomCount >= 100 ? "99+" : notificationAtomCount})</button>
        <button>Me ({totalnotifications >= 100 ? "99+" : totalnotifications })</button>
    </>
  );
}
export default App;
