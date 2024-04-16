import { Outlet} from 'react-router-dom';
import './App.css';
import { Header } from './components/headers';
import { UserContext } from './utils/userContext';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Rutuja Harne"
    };
    setUserName(data.name)
  }, [])

  return (
    <>
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <Outlet />
    </UserContext.Provider>
    </>
  );
}

export default App;
