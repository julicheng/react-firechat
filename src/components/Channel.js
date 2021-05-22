import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Message from './Message';

export default function Channel({ user = null, db = null, auth = null }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
        });

      // detach listener
      return unsubscribe;
    }
  }, [db]);

  return (
    <div className='relative w-full h-full'>
      <ul className='overflow-y-scroll'>
        {messages.map((message) => (
          <li key={message.id}>
            <Message {...message} sent={message.uid === auth.currentUser.uid} />
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleOnSubmit}
        className='border border-black w-full absolute bottom-0'
      >
        <input
          className='w-4/5'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          placeholder='Type your message here...'
        />
        <button
          type='submit'
          disabled={!newMessage}
          className='border border-pink-400'
        >
          Send
        </button>
      </form>
    </div>
  );
}
