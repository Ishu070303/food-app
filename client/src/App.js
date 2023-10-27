import React, { useEffect, useState } from 'react';
import { Main, Login } from './containers';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';

import { Route, Routes  } from 'react-router-dom';
import { validateUserIdToken } from './api';




const App = () => {

  const firebaseAuth = getAuth(app);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserIdToken(token).then((data) => {
            console.log(data);
          });
        });
      }
    })
  }, [])
  
  return (
    <div className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
        <Routes>
            <Route path='/*' element={<Main />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default App