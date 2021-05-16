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
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Message {...message} sent={message.uid === auth.currentUser.uid} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          placeholder='Type your message here...'
        />
        <button type='submit' disabled={!newMessage}>
          Send
        </button>
      </form>
    </>
  );
}
