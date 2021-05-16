import React, { useState, useEffect } from 'react';

export default function Channel({ user = null, db = null }) {
  const [messages, setMessages] = useState([]);

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
          console.log(data);
          setMessages(data);
        });

      // detach listener
      return unsubscribe;
    }
  }, [db]);

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
