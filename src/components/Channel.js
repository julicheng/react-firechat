import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import Message from './Message';

export default function Channel({ user = null, db = null, auth = null }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ref = useRef(null);

  const { uid, displayName, photoURL } = user;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection('messages').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection('messages')
        .orderBy('createdAt')
        .limit(100)
        .onSnapshot((querySnapshot) => {
          // get all documents from collection - with IDs
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
          ref.current.scrollIntoView();
        });

      // detach listener
      return unsubscribe;
    }
  }, [db]);

  return (
    <>
      <div className='relative w-full h-full overflow-y-scroll'>
        <div className='w-full flex-col flex'>
          {messages.map((message) => (
            <Message {...message} sent={message.uid === auth.currentUser.uid} />
          ))}
        </div>
        <div ref={ref}></div>
      </div>
      <form
        onSubmit={handleOnSubmit}
        className='w-full sticky bottom-0 bg-white'
      >
        <input
          className='w-4/5 p-2 focus:outline-none'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          placeholder='Type your message here...'
        />
        <button
          type='submit'
          disabled={!newMessage}
          className={`${
            newMessage ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300'
          } text-center w-1/5 text-white p-2 rounded-sm focus:bg-green-40`}
        >
          Send
        </button>
      </form>
    </>
  );
}
