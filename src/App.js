import React, { useState, useEffect } from 'react';
// components
import Button from './components/Button';
import Channel from './components/Channel';
// firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyAeSTOHS-9H1NljhAluM14_POYm7ZaEGs4',
  authDomain: 'react-firechat-7a2de.firebaseapp.com',
  projectId: 'react-firechat-7a2de',
  storageBucket: 'react-firechat-7a2de.appspot.com',
  messagingSenderId: '432476051096',
  appId: '1:432476051096:web:5bc2eb40b1328cfa7322ed',
  measurementId: 'G-2BTKGX54NS',
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initalizing, setInitalizing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });

    if (initalizing) setInitalizing(false);
    // cleanup subscription
    return unsubscribe;
  }, [initalizing]);

  const signInWithGoogle = async () => {
    // retrieve google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // set language to the default browser preference
    auth.useDeviceLanguage();
    //start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (initalizing) return 'Loading...';

  return (
    <div>
      {user ? (
        <>
          <Button onClick={signOut}>Sign out</Button>
          <Channel user={user} db={db} auth={auth} />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}

export default App;
